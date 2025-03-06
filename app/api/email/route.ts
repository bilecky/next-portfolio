import { sql } from "@vercel/postgres";
import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

// Zmienna przechowująca czas ostatniego wywołania
const IP_REQUEST_LIMIT = 2;

export async function POST(request: NextRequest) {
  const ip = (request.headers.get("x-forwarded-for") ?? "127.0.0.1").split(
    ",",
  )[0];

  const { email, name, message } = await request.json();

  const checkUserRecordInDB =
    await sql`SELECT message_count FROM pins WHERE ip_address = ${ip}`;

  if (checkUserRecordInDB.rows.length === 0) {
    await sql`INSERT INTO pins (ip_address, message_count) VALUES (${ip}, 1)`;
  } else {
    if (checkUserRecordInDB.rows[0].message_count >= IP_REQUEST_LIMIT) {
      return NextResponse.json(
        { error: "TOO_MANY_REQUESTS_FROM_IP_ERROR" },
        { status: 429 }, // Zwróć kod 429 Too Many Requests
      );
    }
    await sql`
    UPDATE pins SET message_count = message_count + 1 WHERE ip_address = ${ip}
  `;
  }

  const transport = nodemailer.createTransport({
    service: "gmail",
    /* 
          setting service as 'gmail' is same as providing these setings:
          host: "smtp.gmail.com",
          port: 465,
          secure: true
          If you want to use a different email provider other than gmail, you need to provide these manually.
          Or you can go use these well known services and their settings at
          https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
      */
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: process.env.MY_EMAIL,
    to: "kontakt@pawelbilski.com",
    // cc: email, (uncomment this line if you want to send a copy to the sender)
    subject: `NEXT.JS Portfolio kontakt: ${name} | (${email})`,
    text: `${message}\n\n${ip}`,
  };
  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Email sent");
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: "Email sent" });
  } catch (err) {
    return NextResponse.json(
      { error: "DEFAULT_API_ROUTE_MAILER_ERROR" },
      { status: 500 },
    );
  }
}

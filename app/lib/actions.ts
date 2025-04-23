"use server";

import { sql } from "@vercel/postgres";
import { UserPin } from "../../components/Contact/PinningComponent";
import {
  containsForbiddenWords,
  sanitizePinName,
} from "../../utils/helperFunctions";
import { headers } from "next/headers";

export async function createPin(pin: UserPin) {
  const ipAddress =
    headers().get("x-forwarded-for")?.split(",")[0] ?? "127.0.0.1";
  const sanitizedName = sanitizePinName(pin.name);
  try {
    // Sprawdź, czy tabela istnieje
    await sql`
  CREATE TABLE IF NOT EXISTS pins (
    id TEXT PRIMARY KEY,
    name TEXT,
    positionX REAL,
    positionY REAL,
    pallette TEXT,
    ip_address TEXT,
    message_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

    const checkIfPinExists = await sql`
      SELECT * FROM pins WHERE name = ${sanitizedName}
    `;

    const checkIfIpExists = await sql`
    SELECT * FROM pins WHERE ip_address = ${ipAddress}
  `;
    const checkIfPinIsTooLong = sanitizedName.length > 6;

    if (checkIfPinIsTooLong) {
      return {
        success: false,
        code: "PIN_NAME_TOO_LONG",
      };
    }

    if (checkIfPinExists?.rowCount && checkIfPinExists.rowCount > 0) {
      return {
        success: false,
        code: "PIN_ALREADY_EXISTS",
      };
    }

    if (containsForbiddenWords(sanitizedName)) {
      return {
        success: false,
        code: "PIN_CONTAINS_FORBIDDEN_WORDS",
      };
    }

    if (checkIfIpExists?.rowCount && checkIfIpExists.rowCount > 0) {
      return {
        success: false,
        code: "PIN_ALREADY_ADDED_BY_IP",
      };
    }

    // Wstaw dane do tabeli
    await sql`
        INSERT INTO pins (id, name, positionX, positionY, pallette, ip_address)
        VALUES (${pin.id}, ${sanitizedName}, ${pin.position.x}, ${pin.position.y}, ${pin.pallette}, ${ipAddress})
      `;

    return { success: true, data: pin };
  } catch (error) {
    console.error("Database Error/pawel:", error);

    return { success: false, code: "UNKNOWN_ERROR" };
  }
}

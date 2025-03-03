"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { UserPin } from "../components/Contact/PinningComponent";
import {
  containsForbiddenWords,
  sanitizePinName,
} from "../utils/helperFunctions";

export async function createPin(pin: UserPin) {
  const sanitizedName = sanitizePinName(pin.name);
  try {
    // Sprawdź, czy tabela istnieje
    await sql`
        CREATE TABLE IF NOT EXISTS pins (
          id TEXT PRIMARY KEY,
          name TEXT,
          positionX REAL,
          positionY REAL,
          pallette TEXT
        )
      `;

    const checkIfPinExists = await sql`
      SELECT * FROM pins WHERE name = ${sanitizedName}
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

    // Wstaw dane do tabeli
    await sql`
        INSERT INTO pins (id, name, positionX, positionY, pallette)
        VALUES (${pin.id}, ${sanitizedName}, ${pin.position.x}, ${pin.position.y}, ${pin.pallette})
      `;

    revalidatePath("/");
    return { success: true, data: pin };
  } catch (error) {
    console.error("Database Error/pawel:", error);

    return { success: false, code: "UNKNOWN_ERROR" };
  }
}

export async function getClientIP() {
  const headers = await import("next/headers").then((mod) => mod.headers());
  const forwardedFor = headers.get("x-forwarded-for");
  const ip = forwardedFor
    ? forwardedFor.split(",")[0]
    : headers.get("x-real-ip");
  return ip || "unknown";
}

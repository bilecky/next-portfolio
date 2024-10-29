"use server";

import { sql } from "@vercel/postgres";
import { headers } from "next/headers";
import { UserPin } from "../components/Contact/PinningComponent";

export async function createPin(pin: UserPin) {
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
      SELECT * FROM pins WHERE name = ${pin.name}
    `;

    if (checkIfPinExists?.rowCount && checkIfPinExists.rowCount > 0) {
      throw new Error("Pin with this name already exists");
    }

    // Wstaw dane do tabeli
    await sql`
        INSERT INTO pins (id, name, positionX, positionY, pallette)
        VALUES (${pin.id}, ${pin.name}, ${pin.position.x}, ${pin.position.y}, ${pin.pallette})
      `;
  } catch (error) {
    console.error("Database Error/pawel:", error);

    // Sprawdź, czy error jest instancją Error
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to create pin in database");
    } else {
      throw new Error("An unknown error occurred/pawel");
    }
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

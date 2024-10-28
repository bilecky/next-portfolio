"use server";

import { sql } from "@vercel/postgres";
import { UserPin } from "../components/Contact";

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

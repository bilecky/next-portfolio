"use server";
import { sql } from "@vercel/postgres";
import { UserPin } from "../components/Contact";

export async function fetchPins() {
  try {
    const data = await sql`SELECT * FROM pins`;

    const pins: UserPin[] = data.rows.map((pin) => ({
      id: pin.id,
      name: pin.name,
      position: { x: pin.positionx, y: pin.positiony },

      pallette: pin.pallette,
    }));

    return pins;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch pins from database");
  }
}

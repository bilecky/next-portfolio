// app/api/pins/route.ts
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { UserPin } from "@/app/components/Contact/PinningComponent";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await sql`SELECT * FROM pins`;

    const pins: UserPin[] = data.rows.map((pin) => ({
      id: pin.id,
      name: pin.name,
      position: { x: pin.positionx, y: pin.positiony },
      pallette: pin.pallette,
    }));

    return NextResponse.json(pins);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch pins from database" },
      { status: 500 },
    );
  }
}

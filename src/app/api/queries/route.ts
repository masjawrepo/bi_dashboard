import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";

export async function POST(req: Request) {
  const { name, config } = await req.json();

  await db.query(
    "INSERT INTO saved_queries (name, config) VALUES (?, ?)",
    [name, JSON.stringify(config)]
  );

  return NextResponse.json({ success: true });
}

export async function GET() {
  const [rows] = await db.query(
    "SELECT id, name, config FROM saved_queries ORDER BY created_at DESC"
  );

  return NextResponse.json(rows);
}

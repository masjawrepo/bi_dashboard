import { NextResponse } from "next/server";
import { buildSQL } from "@/app/lib/sqlBuilder";
import { db } from "@/app/lib/db";
import { QueryConfig } from "@/app/types/query";

export async function POST(req: Request) {
  try {
    const body: QueryConfig = await req.json();

    const sql = buildSQL(body);
    const [rows] = await db.query(sql);

    return NextResponse.json({
      sql,
      data: rows
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

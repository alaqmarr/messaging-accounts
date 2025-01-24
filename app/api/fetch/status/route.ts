import prismadb from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const status = await prismadb.status.findMany();

    return NextResponse.json({
      status: 200,
      message: "Statuses fetched successfully",
      data: status,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import prismadb from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const payee = await prismadb.payee.findMany();

    return NextResponse.json({
      status: 200,
      message: "Payee fetched successfully",
      data: payee,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

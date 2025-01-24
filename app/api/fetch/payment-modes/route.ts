import prismadb from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const handlers = await prismadb.paymentMode.findMany();

    return NextResponse.json({
      status: 200,
      message: "Paymnet Modes fetched successfully",
      data: handlers,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

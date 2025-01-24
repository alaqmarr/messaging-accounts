import prismadb from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const accounts = await prismadb.accounts.findMany();

    return NextResponse.json({
      status: 200,
      message: "Accounts fetched successfully",
      data: accounts,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import prismadb from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  const { name, payeeId } = data;

  if (!name || !payeeId) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  try {
    const create = await prismadb.accounts.create({
      data: {
        name,
        payeeId
      },
    });

    return NextResponse.json({
      status: 200,
      message: "New Account created successfully",
      data: create,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

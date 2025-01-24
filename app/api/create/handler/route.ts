import prismadb from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  const { title } = data;

  if (!title) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  try {
    const create = await prismadb.handlers.create({
      data: {
        name: title,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "New Handler created successfully",
      data: create,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

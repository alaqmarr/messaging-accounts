import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { username, password } = data;
    const client = await clerkClient();

    const user = await client.users.createUser({
      username: username,
      password: password,
    });
    return NextResponse.json({ message: "User created", user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error creating user" });
  }
}

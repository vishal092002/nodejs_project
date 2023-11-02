let prisma = require("@/lib/prismaClient");
import { NextResponse } from "next/server";

export async function GET(request) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request) {
  try {
    const json = await request.json();

    const user = await prisma.user.create({
      data: json,
    });

    return new NextResponse(JSON.stringify(user), { 
    status: 301, 
    headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

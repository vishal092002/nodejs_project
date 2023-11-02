let prisma = require("@/lib/prismaClient");
import { NextResponse } from "next/server";

export async function GET(request) {
  const pets = await prisma.pets.findMany();
  return NextResponse.json(pets);
}

export async function POST(request) {
  try {
    const json = await request.json();

    const pets = await prisma.pets.create({
      data: json,
    });

    return new NextResponse(JSON.stringify(pets), { 
    status: 201, 
    headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

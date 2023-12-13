let prisma = require("@/lib/prismaClient");
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const userid =new URL(request.url).searchParams.get("userid");
  const pets = await prisma.pets.findMany(
    {
      where: {
        userId: parseInt(userid),
      },
    }
  );
  return NextResponse.json(pets);
}

export async function POST(request, { params }) {
  try {
    const userid =new URL(request.url).searchParams.get("userid");
    const json = await request.json();
    //assign the user id to the pet
    Object.assign(json, { userId: parseInt(userid) });  
    console.log(json);
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

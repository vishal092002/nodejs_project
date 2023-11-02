let prisma = require("@/lib/prismaClient");
import { NextResponse } from "next/server";

export async function GET(
  request,
  { params }
) {
  const id = parseInt(params.id);
  const pet = await prisma.pets.findUnique({
    where: {
      id,
    },
  });

  if (!pet) {
    return new NextResponse("No pet with ID found", { status: 404 });
  }

  return NextResponse.json(pet);
}

export async function PATCH(
  request,
  { params }
) {
  const id = parseInt(params.id);
  let json = await request.json();

  const updated_pet = await prisma.pets.update({
    where: { id },
    data: json,
  });

  if (!updated_pet) {
    return new NextResponse("No pet with ID found", { status: 404 });
  }

  return NextResponse.json(updated_pet);
}

export async function DELETE(
  request,
  { params }
) {
  try {
    const id = parseInt(params.id);
    await prisma.pets.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    

    return new NextResponse(error.message, { status: 500 });
  }
}

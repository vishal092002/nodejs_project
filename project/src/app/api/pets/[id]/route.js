let prisma = require("@/lib/prismaClient");
import { NextResponse } from "next/server";

export async function GET(
  request,
  { params }
) {
   const userid =new URL(request.url).searchParams.get("userid");
    console.log("userid", userid);
     const id = parseInt(params.id);
  const pet = await prisma.pets.findUnique({
    where: {
      id,
    userId: parseInt(userid),
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
   const userid =new URL(request.url).searchParams.get("userid");
    console.log("userid", userid);
     const id = parseInt(params.id);
  let json = await request.json();
  const updated_pet = await prisma.pets.update({
    where: { id,
    userId: parseInt(userid), },
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
     const userid =new URL(request.url).searchParams.get("userid");
    console.log("userid", userid);
     const id = parseInt(params.id);
    await prisma.pets.delete({
      where: { id,
        userId: parseInt(userid), }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.log(error);

    return new NextResponse(error.message, { status: 500 });
  }
}

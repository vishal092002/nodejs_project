let prisma = require("@/lib/prismaClient");
import { NextResponse } from "next/server";

export async function GET(
  request,
  { params }
) {
  const id = parseInt(params.id);
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return new NextResponse("No user with ID found", { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PATCH(
  request,
  { params }
) {
  const id = parseInt(params.id);
  let json = await request.json();

  const updated_user = await prisma.user.update({
    where: { id },
    data: json,
  });

  if (!updated_user) {
    return new NextResponse("No user with ID found", { status: 404 });
  }

  return NextResponse.json(updated_user);
}

export async function DELETE(
  request,
  { params }
) {
  try {
    const id = parseInt(params.id);
    await prisma.user.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {

    return new NextResponse(error.message, { status: 500 });
  }
}

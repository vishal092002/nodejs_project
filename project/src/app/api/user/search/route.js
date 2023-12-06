let prisma = require("@/lib/prismaClient");
import { NextResponse } from "next/server";

// export async function GET(request) {
//   //check if the the ?email query parameter exists
//   if(request?.query?.email){
//     console.log(request?.query?.email);
//     //if it does, then we will try to find a user with that email
//     const user = await prisma.user.findUnique({
//       where: {
//         email: request?.query?.email,
//       },
//     });
//     //if we found a user, then we will return it
//     if(user){
//       return new NextResponse(JSON.stringify(user), { 
//         status: 200, 
//         headers: { "Content-Type": "application/json" },
//       });
//     }else{
//       //if we didn't find a user, then we will return a 404
//       return new NextResponse("User not found", { status: 404 });
//     }
//   }
//   const users = await prisma.user.findMany();
//   return NextResponse.json(users);
// }

export async function POST(request) {
  try {
    const json = await request.json();
// console.log(json);
    const user = await prisma.user.findMany({
      where: {
        email: json.email,
      },
    });

    return new NextResponse
    (JSON.stringify(user), { 
    status: 201, 
    headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

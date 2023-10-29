import { addFakeUserToDatabase } from "@/lib/fakerdata"
import prisma from "@/lib/prismaClient"

export default async function Page() {
    

let user = await prisma.pets.findMany()
if(!user.length){
    user = await prisma.user.create({
        data:{
            name:'test',
            email:'im@your.house',
        }
    })
}
if(user.length<26){
    addFakeUserToDatabase({amount:1})
}
console.log(user)
return (
    <>
    <h2>test</h2>
    {
        JSON.stringify(user)
    }
    </>
)
}
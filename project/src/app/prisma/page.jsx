const { PrismaClient } = require('@prisma/client')
export default async function Page() {
    
const prisma = new PrismaClient()
let user = await prisma.user.findMany()
if(!user.length){
    user = await prisma.user.create({
        data:{
            name:'test',
            email:'im@your.house',
        }
    })
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
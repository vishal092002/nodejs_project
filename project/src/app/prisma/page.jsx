import prisma from "@/lib/prismaClient"

export default async function Page() {
    

let user = await prisma.user.findMany()
// if(!user.length){
//     user = await prisma.user.create({
//         data:{
//             name:'test',
//             email:'im@your.house',
//         }
//     })
// }
// if(user.length<26){
//     addFakeUserToDatabase({amount:1})
// }
console.log(user)
return (
    <>
    <h2>test</h2>
    {
        // pretty print the user data
        user.map((user)=>{
            return(
                <div>
                    <h3>{user.name}</h3>
                    {Object.keys(user).map((key)=>{
                        return(
                            <div>
                                <span>{key.toString()}: </span>
                                <span> {user[key].toString()}</span>
                            </div>
                        )
                    })}
                </div>
            )
        })
    }
    </>
)
}
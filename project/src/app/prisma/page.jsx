import prisma from "@/lib/prismaClient"

export default async function Page() {
    

let user = await prisma.user.findMany({
    select:{
        pets:{
            select:{
                "id":true,
                "name":true,
                "type":true,
                
            }
        },
        name:true,
        email:true,
        createdAt:true,
        updatedAt:true
    }
}

)//get all users from the user table
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
return (
    <>
    {
        // print the user data
        user.map((user)=>{
            return(
                <div>
                    <h3>{user.name}</h3>
                    {Object.keys(user).map((key)=>{
                        return(
                            <div key={key}>
                                {
                                    key==='pets'?
                                    user[key].map((pet)=>{
                                        return(
                                            <div key={pet.id}>
                                                <span>{key.toString()}: </span>
                                                <span> {pet.name.toString()+" ["+pet.type.toString()+"]"}</span>
                                            </div>
                                        )
                                    })  
                                    :
                                    null
                                }
                                <span>{key!=='pets'?key.toString()+": ":""} </span>
                                <span>{ key!=='pets'?user[key].toString():""}</span>
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
//import statements
import prisma from "@/lib/prismaClient"; //fetching prisma client

//Function to proccess form data depending on method returned.
export default async function processForm(formData) {
    let method = formData.get("method");
    let schema = formData.get("schema");
    let id = formData.get("id");
    let name = formData.get("name");
    let email = formData.get("email");
    let petType = formData.get("petType");
    let petName = formData.get("petName");

    switch (method) {
        case "POST": 
            //Posting Data to Correct Schemas
            try {
                if (schema === "user") {
                    const newUser = await prisma.user.create({
                        data: {
                            name, 
                            email
                        }
                    });
                    return; //Ask what I should return.
                } else if (schema === "pet") {
                    const newPet = await prisma.pet.create({
                        data: {
                            petType,
                            petName,
                            id
                        }
                    });
                    return; //Ask what I should return
                } else /* Unexpected Schema */ {
                    return { error: "Unexpected schema type." };
                }
            } catch (error) {
                //handling creation errors
                console.error("Error creating schema:", error);
                return { error: "Error creating schema." };
            }
        case "GET":
            //Making sure to fetch correct schema type
            try {
                if (id) {
                    if (schema === "user") {
                        //Retrieve user by id
                        await fetch("api/"+schema);

                        //Making sure user exists
                        if (user) {
                            //display user or navigate to page to display user?
                            return;
                        } else {
                            //Handling case where user is not found
                            return { error: "User not found." };
                        }
                    } else if (schema === "pet") {
                        //Retrieve pet by id. Make sure to also have current user's id?
                        //EX: (where userId: (session user id, etc.) and id: parseInt(id)
                        /** const pet = await prisma.pets.findUnique({
                            where: {
                                id: parseInt(id),
                                userId: /* session user id
                            }
                        }); 
                        */
                        return;
                    } else /* Unexpected schema */ {
                        return;
                    }
                }
            } catch (error) {
                console.error("Error retrieving record:", error);
                return { error: "Error retrieving record." };
            }
        case "PATCH":
            //Making sure to fetch correct schema type
            if (schema === "user") {
                //Making sure "user" with id provided in formData exists, else return error. Not sure if should use a try/catch instead
                /* 
                if (user.id exists)
                    update user.name as name
                    update uer.email as email
                else
                    return some type of error msg 
                */

            } else /* schema == "pet" */ {
                //Making sure "pet" with id provided in formData exists, else return error. Not sure if should use a try/catch instead
                /* 
                if (pet.id exists)
                    display user information
                else
                    return some type of error match 
                */
            }
            break;
        case "DELETE":
            //Making sure to access correct schemas
            if (schema === "user") {

            } else /* schema == "pet" */ {

            }
            break;
        default:
            //Error handling in case there we get unexpected value for method
            break; 
    }
};
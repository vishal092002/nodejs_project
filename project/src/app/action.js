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
                if (id) {
                    //Create Schema
                    let fetch = await fetch(`api/${schema}`, {
                        method: "POST",
                        body: formData,
                    });
                    let data = await fetch.json();
                    return data;
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
                        //Retrieve schema by id
                        let fetch = await fetch(`api/${schema}/${id}`);
                        let data = await fetch.json();

                        //Making sure schema with id exists
                        if (fetch.ok) {                 
                            return data;
                        } else {
                            //Handling case where user is not found
                            return { error: "Schema not found." };
                        }
                        return
                } else {
                    console.error("ID cannot be null.", error);
                    return { error: "ID cannot be null." };
                }
            } catch (error) {
                console.error("Error retrieving record:", error);
                return { error: "Error retrieving record." };
            }
        case "PATCH":
            // Making sure to fetch the correct schema type
            try {
                if (id) {
                    let fetch = await fetch(`api/${schema}/${id}`);
                    let data = await fetch.json();

                    //Use API Routes with Prisma to udpate schema using id
                    if (fetch.ok) {
                        //Update schema
                        let update = await fetch(`api/${schema}/${id}`, {
                            method: "PATCH",
                            body: formData,
                        });
                        data = await update.json();
                        return data;
                    }
                    
                }
                // if (schema === "user") {
                //     // Update user if user with the provided ID exists
                //     const existingUser = await prisma.user.findUnique({
                //         where: {
                //             id: parseInt(id),
                //         },
                //     });

                //     if (existingUser) {
                //         // Update user name and email
                //         const updatedUser = await prisma.user.update({
                //             where: {
                //                 id: existingUser.id,
                //             },
                //             data: {
                //                 name,
                //                 email,
                //             },
                //         });

                //         return updatedUser; // Return the updated user
                //     } else {
                //         // Handle case where user is not found
                //         return { error: "User not found." };
                //     }
                // } else /* schema == "pet" */ {
                //     // Making sure "pet" with id provided in formData exists, else return error
                //     const existingPet = await prisma.pets.findUnique({
                //         where: {
                //             id: parseInt(id),
                //         },
                //     });

                //     if (existingPet) {
                //         // Display pet information (adjust as needed)
                //         return existingPet;
                //     } else {
                //         // Handle case where pet is not found
                //         return { error: "Pet not found." };
                //     }
                // }
            } catch (error) {
                console.error("Error updating record:", error);
                return { error: "Error updating record." };
            }
        case "DELETE":
            // Making sure to access correct schemas
            try {
                if (id) {
                    let fetch = await fetch(`api/${schema}/${id}`);
                    let data = await fetch.json();

                    //Delete schema by id using prisma api routes
                    if (fetch.ok) {
                        let deleteSchema = await fetch(`api/${schema}/${id}`, {
                            method: "DELETE",
                        });
                        data = await deleteSchema.json();
                        return data;
                    }
                }
                // if (schema === "user") {
                //     // Delete user if user with the provided ID exists
                //     const existingUser = await prisma.user.findUnique({
                //         where: {
                //             id: parseInt(id),
                //         },
                //     });

                //     if (existingUser) {
                //         // Delete user
                //         await prisma.user.delete({
                //             where: {
                //                 id: existingUser.id,
                //             },
                //         });

                //         return { message: "User deleted successfully." };
                //     } else {
                //         // Handle case where user is not found
                //         return { error: "User not found." };
                //     }
                // } else /* schema == "pet" */ {
                //     // Delete pet if pet with the provided ID exists
                //     const existingPet = await prisma.pets.findUnique({
                //         where: {
                //             id: parseInt(id),
                //         },
                //     });

                //     if (existingPet) {
                //         // Delete pet
                //         await prisma.pets.delete({
                //             where: {
                //                 id: existingPet.id,
                //             },
                //         });

                //         return { message: "Pet deleted successfully." };
                //     } else {
                //         // Handle case where pet is not found
                //         return { error: "Pet not found." };
                //     }
                // }
            } catch (error) {
                console.error("Error deleting record:", error);
                return { error: "Error deleting record." };
            }

        default:
            // Error handling in case there is an unexpected value for the method
            return { error: "Unexpected method." };
    }
};
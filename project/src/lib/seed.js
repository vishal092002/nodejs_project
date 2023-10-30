let prisma = require('./prismaClient'); //commonJS syntax
let { faker } = require('@faker-js/faker');
// https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#create-a-single-record-and-multiple-related-records
// https://fakerjs.dev/guide/usage.html
// https://www.prisma.io/docs/guides/migrate/seed-database


function generateFakePet() { //return a randomly generated pet object
    return {
        name: faker.person.firstName(),
        type: faker.animal.type(),  
    };
}
function generateFakeUser() { //return a randomly generated user object
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        pets:{
            create:[
                generateFakePet()
            ]
        
        }
        
    };
}
async function addFakeUserToDatabase({amount = 1}) {//add a randomly generated user to the database, default amount is 1
    for (let i = 0; i < amount; i++) {
        await prisma.user.create({
            data: generateFakeUser()
        })
    }
}


addFakeUserToDatabase({amount: 10}) //call the function to add 10 users to the database (this whole script is run when running npx prisma db seed or npx prisma migrate dev)
module.exports = {
    addFakeUserToDatabase,//export the function so it can also be used in other files
}

let prisma = require('./prismaClient');
let { faker } = require('@faker-js/faker');
// https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#create-a-single-record-and-multiple-related-records
// https://fakerjs.dev/guide/usage.html
// https://www.prisma.io/docs/guides/migrate/seed-database
function generateFakePet() {
    return {
        name: faker.person.firstName(),
        type: faker.animal.type(),  
    };
}
async function addFakeUserToDatabase({amount = 1}) {
    for (let i = 0; i < amount; i++) {
        await prisma.user.create({
            data: generateFakeUser()
        })
    }
}

function generateFakeUser() {
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
addFakeUserToDatabase({amount: 10})
module.exports = {
    addFakeUserToDatabase,
}

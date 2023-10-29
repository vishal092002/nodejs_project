// src/lib/fakeData.js

const faker = require('faker');

function generateFakeUser() {
    return {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        address: faker.address.streetAddress(),
        phone: faker.phone.phoneNumber()
    };
}

function addFakeDataToDatabase(db) {
    // Assuming 'db' is an instance of your database and has a method 'add'.
    // This is just a mock to demonstrate the idea. Adapt as per your real database methods.
    
    const user = generateFakeUser();
    db.add(user);
}

module.exports = {
    generateFakeUser,
    addFakeDataToDatabase
};

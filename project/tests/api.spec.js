// @ts-check
const prisma = require('../src/lib/prismaClient')
const { addFakeUserToDatabase, generateFakeUser } = require('../src/lib/seed');
const { test, expect } = require('@playwright/test');


test.beforeEach(async ()=>{ //clear the database before each test and add 1 user
  await prisma.user.deleteMany({})
  await prisma.pets.deleteMany({})
  await addFakeUserToDatabase({amount: 1}).then(()=>{
    prisma.$disconnect()
})
})

test('GET on User', async ({ request }) => {
  const req = await request.get(`/api/user`)
  expect(req.status()).toBe(200)
  expect(await req.json()).not.toEqual([])
});
test('GET on Pets', async ({ request }) => {
  const req = await request.get(`/api/pets`)
  expect(req.status()).toBe(200)
  expect(await req.json()).not.toEqual([])
});
test('POST on Pets', async ({ request }) => {
  const req = await request.post(`/api/pets`,{
    data: {"type":"rabbit","name":"Douglas"}
  })
  let jsonvalue = await req.json()
  expect(req.status()).toBe(201)
  expect(jsonvalue).not.toBe([])
}
);
test('POST on Users', async ({ request }) => {
  const req = await request.post(`/api/user`,{
    data: {"email":"test@test.com","name":"Douglas"}
  })
  let jsonvalue = await req.json()
  expect(req.status()).toBe(201)
  expect(jsonvalue).not.toBe([])
  expect(jsonvalue.name).toBe("Douglas")
  expect(jsonvalue.email).toBe("test@test.com")
});

test('GET by ID on User', async ({ request }) => {
  let firstUser = await prisma.user.findFirst()
  let userID = firstUser.id
  const req = await request.get(`/api/user/${userID}`)
  expect(req.status()).toBe(200)
  expect(await req.json()).not.toEqual([])
  let jsonvalue = await req.json()
  expect(jsonvalue.name).toBe(firstUser.name)
  expect(jsonvalue.email).toBe(firstUser.email)
});
test('GET by ID on Pets', async ({ request }) => {
  let firstPet = await prisma.pets.findFirst()
  let petID = firstPet.id
  const req = await request.get(`/api/pets/${petID}`)
  expect(req.status()).toBe(200)
  expect(await req.json()).not.toEqual([])
  let jsonvalue = await req.json()
  expect(jsonvalue.name).toBe(firstPet.name)
  expect(jsonvalue.type).toBe(firstPet.type)
});
test("PATCH on User email", async ({ request }) => {

  let firstUser = await prisma.user.findFirst()
  let userID = firstUser.id
  const req = await request.patch(`/api/user/${userID}`,{
    data: {"email":"test2@test.com"}
  })
  expect(req.status()).toBe(200)
  expect(await req.json()).not.toEqual([])
  let jsonvalue = await req.json()
  expect(jsonvalue.email).toBe("test2@test.com")
});
test("PATCH on User name", async ({ request }) => {
  
  let firstUser = await prisma.user.findFirst()
  let userID = firstUser.id
  const req = await request.patch(`/api/user/${userID}`,{
    data: {"name":"test2"}
  })
  expect(req.status()).toBe(200)
  expect(await req.json()).not.toEqual([])
  let jsonvalue = await req.json()
  expect(jsonvalue.name).toBe("test2")
});

test("PATCH on Pets name", async ({ request }) => {
    
    let firstPet = await prisma.pets.findFirst()
    let petID = firstPet.id
    const req = await request.patch(`/api/pets/${petID}`,{
      data: {"name":"test"}
    })
    expect(req.status()).toBe(200)
    expect(await req.json()).not.toEqual([])
    let jsonvalue = await req.json()
    expect(jsonvalue.name).toBe("test")
  });

  test("PATCH on Pets type", async ({ request }) => {
      
      let firstPet = await prisma.pets.findFirst()
      let petID = firstPet.id
      const req = await request.patch(`/api/pets/${petID}`,{
        data: {"type":"test"}
      })
      expect(req.status()).toBe(200)
      expect(await req.json()).not.toEqual([])
      let jsonvalue = await req.json()
      expect(jsonvalue.type).toBe("test")
    });

test('DELETE on User', async ({ request }) => {
  let firstUser = await prisma.user.findFirst()
  let userID = firstUser.id
  const req = await request.delete(`/api/user/${userID}`)
  expect(req.status()).toBe(204)
  expect(await req.text()).toBe("")
});

test('DELETE on Pets', async ({ request }) => {
  let firstPet = await prisma.pets.findFirst()
  let petID = firstPet.id
  const req = await request.delete(`/api/pets/${petID}`)
  expect(req.status()).toBe(204)
  expect(await req.text()).toBe("")
});

test('GET on Deleted User', async ({ request }) => {
  let firstUser = await prisma.user.findFirst()
  let userID = firstUser.id
  const req1 = await request.delete(`/api/user/${userID}`)
  const req2 = await request.get(`/api/user/${userID}`)
  expect(req2.status()).toBe(404)
  expect(await req2.text()).toBe("No user with ID found")
});
test('GET on Deleted Pets', async ({ request }) => {
let firstPet = await prisma.pets.findFirst()
let petID = firstPet.id
const req1 = await request.delete(`/api/pets/${petID}`)
const req2 = await request.get(`/api/pets/${petID}`)
expect(req2.status()).toBe(404)
expect(await req2.text()).toBe("No pet with ID found")
})

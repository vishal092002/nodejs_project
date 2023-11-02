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
});
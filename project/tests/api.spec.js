// @ts-check
const prisma = require('../src/lib/prismaClient')
const { generateFakeUser } = require('../src/lib/seed');
const { test, expect } = require('@playwright/test');


test('GET on User', async ({ request }) => {
  const req = await request.get(`/api/users`)
  expect(req.status()).toBe(200)
  expect(await req.json()).not.toEqual([])
});
// https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/instantiate-prisma-client
let {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
module.exports = prisma
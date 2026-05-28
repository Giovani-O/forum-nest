import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { PrismaPg } from '@prisma/adapter-pg'
import { config } from 'dotenv'
import { PrismaClient } from '../generated/prisma/client'

config({ path: '.env', override: true })
config({ path: '.env.test', override: true })

function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      'Please provide a DATABASE_URL in the environment variables',
    )
  }

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schemaId)
  return url.toString()
}

const schemaId = randomUUID()
let prisma: PrismaClient

beforeAll(async () => {
  const databaseUrl = generateUniqueDatabaseURL(schemaId)
  process.env.DATABASE_URL = databaseUrl

  const adapter = new PrismaPg(
    { connectionString: databaseUrl },
    { schema: schemaId },
  )
  prisma = new PrismaClient({ adapter })

  execSync('pnpm prisma migrate deploy')
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prisma.$disconnect()
})

import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { PrismaPg } from '@prisma/adapter-pg'
import { config } from 'dotenv'
import { Redis } from 'ioredis'
import { DomainEvents } from '@/core/events/domain-events'
import { envSchema } from '@/infra/env/env'
import { PrismaClient } from '../generated/prisma/client'

config({ path: '.env', override: true })
config({ path: '.env.test', override: true })

const env = envSchema.parse(process.env)

function generateUniqueDatabaseURL(schemaId: string) {
  if (!env.DATABASE_URL) {
    throw new Error(
      'Please provide a DATABASE_URL in the environment variables',
    )
  }

  const url = new URL(env.DATABASE_URL)
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
  const redis = new Redis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    db: env.REDIS_DB,
  })

  DomainEvents.shouldRun = false

  await redis.flushdb()

  execSync('pnpm prisma migrate deploy')
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prisma.$disconnect()
})

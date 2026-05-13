import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../generated/prisma/client'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const adapter = new PrismaPg(process.env.DATABASE_URL ?? '')

    super({ adapter, log: ['warn', 'error'] })
  }
  onModuleInit() {
    return this.$connect()
  }
  onModuleDestroy() {
    return this.$disconnect()
  }
}

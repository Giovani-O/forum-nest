import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

// Permite que o serviço seja utilizado em outras partes da aplicação
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  public client: PrismaClient

  constructor() {
    super({
      log: ['warn', 'error'],
    })
  }

  // Ações executadas no inicio e destruição do módulo
  // Ajudam a garantir que a conexão com o módulo permaneça ativa
  onModuleInit() {
    return this.$connect()
  }

  onModuleDestroy() {
    return this.$disconnect()
  }
}

import { resolve } from 'node:path'
import { register } from 'tsconfig-paths'

register({
  baseUrl: resolve(process.cwd(), 'dist/src'),
  paths: {
    '@/*': ['./*'],
  },
})

import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import 'dotenv/config'
import { AppModule } from './app.module.js'
import { Env } from './env.js'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false
  })

  const configService = app.get<ConfigService<Env, true>>(ConfigService)
  const port = configService.get('PORT', { infer: true })

  app.getHttpAdapter().getInstance().set('json spaces', 2)
  app.enableShutdownHooks()
  await app.listen(port)
}
bootstrap()

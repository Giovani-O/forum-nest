import { resolve } from 'node:path'
import { register } from 'tsconfig-paths'

register({
  baseUrl: resolve(process.cwd(), 'dist/src'),
  paths: {
    '@/*': ['./*'],
  },
})

import { NestFactory } from '@nestjs/core'
import 'dotenv/config'
import { AppModule } from './app.module.js'
import { EnvService } from './env/env.service.js'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false
  })

  const configService = app.get(EnvService)
  const port = configService.get('PORT')

  app.getHttpAdapter().getInstance().set('json spaces', 2)
  app.enableShutdownHooks()
  await app.listen(port)
}
bootstrap()

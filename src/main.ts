import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module.js'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false
  })
  app.getHttpAdapter().getInstance().set('json spaces', 2)
  app.enableShutdownHooks()
  await app.listen(process.env.PORT ?? 3333)
}
bootstrap()

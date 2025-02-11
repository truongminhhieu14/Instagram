import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomizeResponseInterceptor } from './util/customResponse.interceptor';
import { ClassSerializerInterceptor } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'verbose', 'debug']
  });
  app.useGlobalInterceptors(new CustomizeResponseInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true
  });
  app.use(cookieParser())
  await app.listen(4000);
}
bootstrap();

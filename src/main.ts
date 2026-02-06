import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SequelizeExceptionFilter } from './common/filters/sequelize-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new SequelizeExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

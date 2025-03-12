import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from "dotenv";
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';
import { CatchEverythingFilter } from './shared/filters/exception.filter';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters( new CatchEverythingFilter());
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API with NestJS for our Sinea app')
    .setDescription('Sinea swagger')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api", app, document);

  const PORT = process.env.PORT || 8000;
  app.enableCors();

  await app.listen(PORT);
  console.log(`Swagger is running at http://localhost:${PORT}/api`);

}
bootstrap();

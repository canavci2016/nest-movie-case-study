import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Movie example')
    .setDescription(
      'The given service is created to prove that i have extensive knowledge in nodejs and some other libraries',
    )
    .setVersion('1.0')
    .addTag('movie')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.set('query parser', 'extended');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Twitter API')
    .setDescription('The Twitter API - User Registration, Login, Profile, Tweets, Retweets, Likes..')
    .setVersion('1.0')
    .addBearerAuth( // not mandatory across all routes
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token' 
    )
    .addServer('http://localhost:3000/', 'Local environment')
    // .addTag('TWITTER API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();

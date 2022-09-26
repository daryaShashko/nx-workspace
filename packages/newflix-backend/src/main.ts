import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT || 3333;

    const config = new DocumentBuilder()
        .setTitle('newflix example')
        .setDescription('The newflix API description')
        .setVersion('1.0')
        .addTag('newflix')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(port);
    Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

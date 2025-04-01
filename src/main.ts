import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Configuração específica de CORS
    app.enableCors({
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: 'Content-Type, Accept',
    });

    const port = process.env.PORT || 8080;
    await app.listen(port);
    console.log(`Aplicação rodando em: ${await app.getUrl()}`);
}
bootstrap();
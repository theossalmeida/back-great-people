import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';


async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Configuração do CORS
        app.enableCors({
            origin: [
                'http://localhost:3000',
                'http://frontend-great-people.s3-website-sa-east-1.amazonaws.com/',
                'http://swagger-great-people.s3-website-sa-east-1.amazonaws.com/'
            ],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: 'Content-Type, Accept',
    });

    // Configuração do Swagger
    const config = new DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('Documentação das APIs de Pesquisas e Upload')
        .setVersion('1.0.0')
        .addServer('http://great-people.eba-2gmpbscy.sa-east-1.elasticbeanstalk.com')
        .build();

    const document = SwaggerModule.createDocument(app, config);


    // Configurar a interface do Swagger com opções e CSS customizado para ocultar os modelos
    SwaggerModule.setup('api-docs', app, document, {
        swaggerOptions: {
            defaultModelsExpandDepth: -1,
            docExpansion: 'list',
            tagsSorter: 'alpha',
            operationsSorter: 'alpha',
            filter: true,
            showExtensions: false,
        },
        customCss: '.swagger-ui .models { display: none }', // CSS para ocultar os modelos
        customJs: '',
        customfavIcon: '',
        explorer: true,
    });

    // Gerar arquivo do Swagger para o S3
    const outputPath = path.resolve(process.cwd(), 'swagger');
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath);
    }

    fs.writeFileSync(
        path.resolve(outputPath, 'swagger-spec.json'),
        JSON.stringify(document, null, 2)
    );

    // Criar HTML customizado do Swagger que oculta os modelos
    const htmlContent = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>API Documentation</title>
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.0.0/swagger-ui.css">
  <style>
    .swagger-ui .models { display: none !important; }
    .swagger-ui .scheme-container { padding: 15px 0; }
    .swagger-ui .topbar { display: none }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.0.0/swagger-ui-bundle.js"></script>
  <script>
    window.onload = function() {
      window.ui = SwaggerUIBundle({
        url: "./swagger-spec.json",
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis
        ],
        layout: "BaseLayout",
        defaultModelsExpandDepth: -1,
        docExpansion: "list"
      });
    }
  </script>
</body>
</html>
  `;

    fs.writeFileSync(
        path.resolve(outputPath, 'index.html'),
        htmlContent
    );

    const port = process.env.PORT || 8080;
    await app.listen(port);
    console.log(`Aplicação rodando em: ${await app.getUrl()}`);
    console.log(`Documentação Swagger disponível em: ${await app.getUrl()}/api-docs`);
}

bootstrap();

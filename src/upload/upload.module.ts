import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule], // Importa o módulo de configurações para acesso às variáveis de ambiente
    controllers: [UploadController],
    providers: [UploadService],
})
export class UploadModule {}

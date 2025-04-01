import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Express } from 'express';

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        const fileName = file.originalname;
        const fileBuffer = file.buffer;
        try {
            await this.uploadService.upload(fileName, fileBuffer);
            return {message: 'Arquivo enviado com sucesso.'};
        } catch {
            return {status: 400, message: 'Falha ao salvar arquivo'}
        }
    }
}
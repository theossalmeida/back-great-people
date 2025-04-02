import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Express } from 'express';
import { ApiTags, ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    @Post()
    @ApiOperation({ summary: 'Fazer upload de um arquivo para o S3' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            required: ['file'],
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                    description: 'Arquivo a ser enviado',
                },
            },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Arquivo enviado com sucesso',
        schema: {
            type: 'object',
            properties: {
                message: {
                    type: 'string',
                    example: 'Arquivo enviado com sucesso.',
                },
            },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Falha ao salvar arquivo',
        schema: {
            type: 'object',
            properties: {
                status: {
                    type: 'number',
                    example: 400,
                },
                message: {
                    type: 'string',
                    example: 'Falha ao salvar arquivo',
                },
            },
        },
    })
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        const fileName = file.originalname;
        const fileBuffer = file.buffer;
        try {
            await this.uploadService.upload(fileName, fileBuffer);
            return { message: 'Arquivo enviado com sucesso.' };
        } catch {
            return { status: 400, message: 'Falha ao salvar arquivo' };
        }
    }
}

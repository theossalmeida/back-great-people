import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
    private readonly s3Client: S3Client;

    constructor(private readonly configService: ConfigService) {
        // Recupera a região e opcionalmente o nome do bucket a partir do ConfigService
        this.s3Client = new S3Client({
            region: this.configService.getOrThrow('AWS_S3_REGION'),
        });
    }

    async upload(fileName: string, file: Buffer) {
        await this.s3Client.send(
            new PutObjectCommand({
                Bucket: this.configService.get('AWS_S3_BUCKET') || 'great-people-teste', // Pode usar variável de ambiente ou valor fixo
                Key: 'a_tratar/' + fileName,
                Body: file,
            }),
        );
    }
}

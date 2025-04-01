import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
    private readonly s3Client: S3Client;

    constructor(private readonly configService: ConfigService) {
        // Configura o AWS para a região do Bucket
        this.s3Client = new S3Client({
            region: this.configService.getOrThrow('AWS_S3_REGION'), // região do bucket no .env
            credentials: {
                accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'), //chave de acesso no .env
                secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'), //chave de acesso secreta no .env
            },
        });
    }

    async upload(fileName: string, file: Buffer) {
        // Faz o upload do arquivo para o bucket
        await this.s3Client.send(
            new PutObjectCommand({
                Bucket: this.configService.get('AWS_S3_BUCKET') || 'great-people-teste', // Pode usar variável de ambiente ou valor fixo
                Key: 'a_tratar/' + fileName,
                Body: file,
            }),
        );
    }
}

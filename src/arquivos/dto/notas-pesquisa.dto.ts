import { ApiProperty } from '@nestjs/swagger';

export class SaveNotasDTO {
    @ApiProperty({ example: 'Pesquisa de mercado', description: 'Nome da pesquisa.' })
    nome_pesquisa: string;

    @ApiProperty({ example: '2025-04-01', description: 'Data de criação da pesquisa.' })
    created_date: string; // ou Date, se preferir

    @ApiProperty({ example: 8.5, description: 'Nota 1 da pesquisa.', required: false })
    nota_1?: number;

    @ApiProperty({ example: 7.3, description: 'Nota 2 da pesquisa.', required: false })
    nota_2?: number;

    @ApiProperty({ example: 7.9, description: 'Média da pesquisa.', required: false })
    media_pesquisa?: number;
}

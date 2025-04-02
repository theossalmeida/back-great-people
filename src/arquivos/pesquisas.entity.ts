import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('pesquisas')
export class Pesquisas {
    @ApiProperty({ example: 1, description: 'Unique identifier for the pesquisa.' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Pesquisa de mercado', description: 'Nome da pesquisa.' })
    @Column()
    nome_pesquisa: string;

    @ApiProperty({ example: '2025-04-01', description: 'Data de criação da pesquisa.' })
    @Column({ type: 'date' })
    created_date: Date;

    @ApiProperty({ example: 8.5, description: 'Primeira nota da pesquisa.', required: false })
    @Column({ type: 'float', nullable: true })
    nota_1: number;

    @ApiProperty({ example: 7.3, description: 'Segunda nota da pesquisa.', required: false })
    @Column({ type: 'float', nullable: true })
    nota_2: number;

    @ApiProperty({ example: 7.9, description: 'Média das notas da pesquisa.', required: false })
    @Column({ type: 'float', nullable: true })
    media_pesquisa: number;
}

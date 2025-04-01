import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pesquisas')
export class Pesquisas {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome_pesquisa: string;

    @Column({ type: 'date' })
    created_date: Date;

    @Column({ type: 'float', nullable: true})
    nota_1: number;

    @Column({ type: 'float', nullable: true})
    nota_2: number;

    @Column({ type: 'float', nullable: true})
    media_pesquisa: number;

}

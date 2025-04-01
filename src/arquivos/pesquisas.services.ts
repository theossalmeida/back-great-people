import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pesquisas } from './pesquisas.entity';
import { SaveNotasDTO } from './dto/notas-pesquisa.dto';

@Injectable()
export class PesquisasServices {
    constructor(
        @InjectRepository(Pesquisas)
        private pesquisasRepository: Repository<Pesquisas>,
    ) {}

    findAll() {
        return this.pesquisasRepository
            .createQueryBuilder('pesquisas')
            .getMany();
    }

    create(saveNotasDTO: SaveNotasDTO[]) {
        const notas = this.pesquisasRepository.create(saveNotasDTO);
        return this.pesquisasRepository.save(notas);
    }
}

import {Injectable, NotFoundException} from '@nestjs/common';
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
        // Serviço que busca todas as pesquisa no banco
        return this.pesquisasRepository
            .createQueryBuilder('pesquisas')
            .getMany();
    }

    create(saveNotasDTO: SaveNotasDTO) {
        const novaNota = this.pesquisasRepository.create(saveNotasDTO);
        return this.pesquisasRepository.save(novaNota);
    }

    edit(saveNotasDTO: SaveNotasDTO, id: number) {
        const pesquisa = this.pesquisasRepository.findOne({ where: { id } });
        if (!pesquisa) {
            throw new NotFoundException(`Pesquisa com id ${id} não encontrada`);
        }
        const updatedPesquisa = { ...pesquisa, ...saveNotasDTO, id };
        return this.pesquisasRepository.save(updatedPesquisa);
    }

    delete(id: number) {
        const pesquisa = this.pesquisasRepository.findOne({where:  {id}});
        if (!pesquisa) {
            throw new NotFoundException(`Pesquisa com id ${id} não encontrada`);
        } else {
            return this.pesquisasRepository.delete(id);
        }
    }

    async createMultiples(saveNotasDTO: SaveNotasDTO[]) {
        // Esse serviço de create verifica dentro da lista enviada se alguma pesquisa já consta no banco,
        // para evitar pesquisas duplicadas na base
        const nomesPesquisas = saveNotasDTO.map(nota => nota.nome_pesquisa);

        const pesquisasExistentes = await this.pesquisasRepository
            .createQueryBuilder('pesquisas')
            .where('pesquisas.nome_pesquisa IN (:...nomes)', { nomes: nomesPesquisas })
            .getMany();

        const nomesExistentes = new Set(pesquisasExistentes.map(p => p.nome_pesquisa));

        const notasParaSalvar = saveNotasDTO.filter(nota => !nomesExistentes.has(nota.nome_pesquisa));

        if (notasParaSalvar.length === 0) {
            return [];
        }

        const novasNotas = this.pesquisasRepository.create(notasParaSalvar);
        return this.pesquisasRepository.save(novasNotas);
    }
}

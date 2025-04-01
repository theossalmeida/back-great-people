import { Controller, Get, Post, Body } from '@nestjs/common';
import { PesquisasServices } from './pesquisas.services';
import { SaveNotasDTO } from './dto/notas-pesquisa.dto';

@Controller('pesquisas')
export class PesquisasController {
    constructor(private pesquisasServices: PesquisasServices) {}

    @Get()
    findAll() {
        return this.pesquisasServices.findAll();
    }


    @Post()
    create(@Body() saveNotasDTO: SaveNotasDTO[]) {
        return this.pesquisasServices.create(saveNotasDTO);
    }

}

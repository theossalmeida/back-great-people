import {Controller, Get, Post, Delete, Put, Body, Param, ParseIntPipe} from '@nestjs/common';
import { PesquisasServices } from './pesquisas.services';
import { SaveNotasDTO } from './dto/notas-pesquisa.dto';

@Controller('pesquisas')
export class PesquisasController {
    constructor(private pesquisasServices: PesquisasServices) {}

    @Get()
    findAll() {
        return this.pesquisasServices.findAll();
    }


    @Post('multiples')
    createMultiples(@Body() saveNotasDTO: SaveNotasDTO[]) {
        return this.pesquisasServices.createMultiples(saveNotasDTO);
    }

    @Post()
    create(@Body() saveNotasDTO: SaveNotasDTO) {
        return this.pesquisasServices.create(saveNotasDTO);
    }

    @Put(':id')
    edit(@Body() saveNotasDTO: SaveNotasDTO, @Param('id', ParseIntPipe) id: number) {
        return this.pesquisasServices.edit(saveNotasDTO, id);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        try {
            return this.pesquisasServices.delete(id)
        } catch (e) {
            return {
                'status': 400,
                'message': 'Pesquisa não encontrada com o ID enviado.'
            }
        }
    }

}

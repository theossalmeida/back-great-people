import { Controller, Post, Body, Get, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SaveNotasDTO } from './dto/notas-pesquisa.dto';
import { PesquisasServices } from './pesquisas.services';

@ApiTags('Pesquisas')
@Controller('pesquisas')
export class PesquisasController {
    constructor(private pesquisasServices: PesquisasServices) {}

    @Get()
    @ApiOperation({ summary: 'Retorna todas as pesquisas' })
    @ApiResponse({ status: 200, description: 'Lista de pesquisas retornada com sucesso' })
    findAll() {
        return this.pesquisasServices.findAll();
    }

    @Post()
    @ApiOperation({ summary: 'Cria uma nova pesquisa' })
    @ApiBody({ type: SaveNotasDTO })
    @ApiResponse({ status: 201, description: 'Pesquisa criada com sucesso' })
    create(@Body() dto: SaveNotasDTO) {
        return this.pesquisasServices.create(dto);
    }

    @Post('multiples')
    @ApiOperation({ summary: 'Salva multiplas pesquisas de uma vez no banco de dados' })
    @ApiBody({ type: SaveNotasDTO, isArray: true })
    @ApiResponse({ status: 201, description: 'Pesquisa criada com sucesso' })
    createMultiples(@Body() dto: SaveNotasDTO[]) {
        return this.pesquisasServices.createMultiples(dto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualiza uma pesquisa existente' })
    @ApiBody({ type: SaveNotasDTO })
    @ApiResponse({ status: 200, description: 'Pesquisa atualizada com sucesso' })
    edit(@Param('id', ParseIntPipe) id: number, @Body() dto: SaveNotasDTO) {
        return this.pesquisasServices.edit(dto, id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remove uma pesquisa pelo ID' })
    @ApiResponse({ status: 200, description: 'Pesquisa removida com sucesso' })
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.pesquisasServices.delete(id);
    }
}

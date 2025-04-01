import { Module } from '@nestjs/common';
import { PesquisasServices } from './pesquisas.services';
import { PesquisasController } from './pesquisas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pesquisas } from './pesquisas.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Pesquisas])],
    providers: [PesquisasServices],
    controllers: [PesquisasController],
    exports: [PesquisasServices],
})
export class PesquisasModule {}

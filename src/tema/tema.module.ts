import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tema } from './entities/tema.entity';
import { TemaService } from './services/tema.service';
import { TemaController } from './controllers/tema.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tema])],
  providers: [TemaService], // Desta forma a Classe de Serviço poderá ser injetada em outras Classes dentro do Módulo Tema. Ou seja, qualquer outra classe dentro desse módulo (por exemplo, TemaController) poderá utilizar o serviço TemaService sem precisar instanciá-lo manualmente. O NestJS se encarrega de criar e fornecer a instância correta do serviço.
  controllers: [TemaController],
  exports: [TemaService],
})
export class TemaModule {}

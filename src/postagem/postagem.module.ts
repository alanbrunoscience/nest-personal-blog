import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './entities/postagem.entity';
import { PostagemService } from './services/postagem.service';
import { PostagemController } from './controllers/postagem.controller';
import { TemaModule } from '../tema/tema.module';

// O decorador @Module define que esta classe será a principal do Módulo. Nela, registramos todas as dependências necessárias, como as Classes Entidade, Service e Controller, que fazem parte do módulo.
@Module({
  imports: [TypeOrmModule.forFeature([Postagem]), TemaModule], // Utilizamos o método forFeature() da classe TypeOrmModule para importar todas as Classes Entidade (Model) do módulo. Este método é responsável por registrar as entidades, permitindo que o NestJS as utilize para interagir com o banco de dados.
  providers: [PostagemService], // Para registrar as classes de serviço que serão responsáveis pela lógica da aplicação.
  controllers: [PostagemController], // Para registrar as classes controladoras, responsáveis por receber as requisições HTTP (requests) e delegar o processamento para as classes de serviço.
  exports: [], // Para adicionar as Classes que precisam ser disponibilizadas para outros módulos. Isso permite que outras partes da aplicação possam utilizar essas classes de forma compartilhada.
})
export class PostagemModule {} // Exportar a classe 'PostagemModule', tornando-a acessível e permitindo que ela seja registrada no 'AppModule'.

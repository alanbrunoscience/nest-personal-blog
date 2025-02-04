import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.module';
import { TemaModule } from './tema/tema.module';
import { Tema } from './tema/entities/tema.entity';
import { AuthModule } from './auth/auth.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService, // Para executar a aplicação localmente, precisamos alterar esta linha para a Classe DevService.
      imports: [ConfigModule],
    }),
    PostagemModule,
    TemaModule,
    AuthModule,
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

/* Antes da Implementação do Render

@Module({
  imports: [
    // TypeOrmModule.forRoot(): Usado para configurar a conexão principal com o banco de dados. O termo 'forRoot' significa que você está inicializando e registrando a configuração global principal do TypeORM para o módulo raiz da aplicação.
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_personal_blog',
      entities: [Postagem, Tema, Usuario], // Cadastrar as Classes Entities, para que o TypeORM possa gerar as tabelas correspondentes no BD.
      synchronize: true, // Permite que as tabelas do BD sejam criadas ou atualizadas automaticamente (estrutura das tabelas) sempre que a aplicação for inicializada. Nunca utilize 'synchronize' em produção, pois ela pode causar a perda de todos os dados do cliente ao recriar ou atualizar automaticamente as tabelas do banco.
      // logging: true,
    }),
    PostagemModule, // Inserimos a Classe PostagemModule para garantir que os recursos do módulo de Postagem, como a Entidade, Service e Controller, sejam registrados e possam ser utilizados pela aplicação. Se um Módulo não for registrado no Módulo principal da aplicação (AppModule), não será possível criar um Relacionamento com as Classes Entidades deste Módulo.
    TemaModule,
    AuthModule,
    UsuarioModule,
  ],
  controllers: [AppController], // Se a Classe AppController, não for registrada no Módulo principal da aplicação (AppModule), o endpoint do Swagger não ficará disponível.
  providers: [],
})
export class AppModule {} // O AppModule é o módulo raiz da aplicação e, ao registrar o PostagemModule (por exemplo), ele disponibiliza as funcionalidades de Postagem para toda a aplicação.

*/

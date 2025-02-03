import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { forwardRef, Module } from '@nestjs/common';
import { UsuarioService } from './services/usuario.service';
import { UsuarioController } from './controllers/usuario.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  // No array imports, vamos adicionar a Classe AuthModule do Módulo Auth. Dessa forma, a classe de serviço Bcrypt poderá ser injetada em outras classes dentro do Módulo Usuario.
  imports: [TypeOrmModule.forFeature([Usuario]), forwardRef(() => AuthModule)], // forwardRef(): para evitar o erro de Dependência Cíclica, porque AuthModule utilizará UsuarioModule e vice-versa.
  providers: [UsuarioService],
  controllers: [UsuarioController],
  exports: [UsuarioService],
})
export class UsuarioModule {}

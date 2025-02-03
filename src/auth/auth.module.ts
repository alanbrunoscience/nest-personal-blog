import { forwardRef, Module } from '@nestjs/common';
import { Bcrypt } from './bcrypt/bcrypt';
import { UsuarioModule } from '../usuario/usuario.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UsuarioModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [Bcrypt, AuthService, LocalStrategy, JwtStrategy], // Classe de serviço.
  controllers: [AuthController],
  exports: [Bcrypt], // A classe Bcrypt foi registrada no array exports, pois precisaremos utilizá-la no Módulo Usuario.
})
export class AuthModule {}

/* Observações

Observe que apenas a Classe Bcrypt foi registrada no AuthModule, pois ela é a responsável pela lógica de criptografia de senhas. Já a Classe UsuarioLogin não foi registrada, pois ela é funcionará de forma semelhante à um DTO (Data Transfer Object), que serve como um modelo para transferir as credenciais de login do usuário, e não gera uma tabela no banco de dados.

*/

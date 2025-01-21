// A Classe Main é a Classe principal da nossa aplicação. Nesta Classe definimos algumas configurações sobre como a nossa aplicação será inicializada.

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.env.TZ = '-03:00'; // Configurar o fuso horário da aplicação para Time Zone (TZ) -03:00 (horário de Brasília no padrão UTC), já que o Brasil está em UTC -03:00 em relação a Greenwich (UTC 00:00).

  app.useGlobalPipes(new ValidationPipe()); // Responsável por aplicar validação automática em todos os dados recebidos nas requisições da aplicação, garantindo que estejam no formato correto definido pelos DTOs (Data Transfer Object (Objeto de Transferência de Dados)) e retornando erros em caso de inconsistências. Se a classe ValidationPipe não for registrada na Classe main, as regras de validação definidas nos atributos das Classes Entidade não serão aplicadas. Isso significa que os dados enviados nas requisições não serão validados, permitindo que informações inválidas ou incorretas sejam aceitas e persistidas no banco de dados, o que pode comprometer o funcionamento e a integridade da aplicação.

  app.enableCors(); // Habilita o Cross-Origin Resource Sharing (CORS) em toda a aplicação, permitindo que o servidor atenda requisições de diferentes origens (Arquitetura SOFEA). Ao migrar para um ambiente de produção, é altamente recomendado definir o endereço do deploy do Frontend no método enableCors() para restringir as origens permitidas e reforçar a segurança.

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();

import { Postagem } from '../entities/postagem.entity';
import { PostagemService } from './../services/postagem.service';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('/postagens') // Definir o caminho do recurso Postagem
export class PostagemController {
  constructor(private readonly PostagemService: PostagemService) {} // Construtor criado para receber as Injeções de Dependências necessárias para o funcionamento da classe controladora. Com isso, podemos acessar todos os métodos e funcionalidades da PostagemService dentro da controladora, permitindo que a lógica de negócios (como a recuperação, criação, atualização e exclusão de postagens) seja delegada ao serviço, mantendo a controladora focada apenas em gerenciar as requisições HTTP.

  @Get()
  @HttpCode(HttpStatus.OK) // Status 200 - Operação realizada com êxito. Caso ocorra algum erro durante o processamento, o código de status será ajustado de acordo com o tipo de erro.
  findAll(): Promise<Postagem[]> {
    return this.PostagemService.findAll();
  }
}

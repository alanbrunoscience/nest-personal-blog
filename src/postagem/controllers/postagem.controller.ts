import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { Postagem } from '../entities/postagem.entity';
import { PostagemService } from './../services/postagem.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Controller('/postagens') // Definir o caminho do recurso Postagem (endpoint)
export class PostagemController {
  constructor(private readonly postagemService: PostagemService) {} // Construtor criado para receber as Injeções de Dependências necessárias para o funcionamento da classe controladora.
  // Com isso, podemos acessar todos os métodos e funcionalidades da PostagemService dentro da controladora, permitindo que a lógica de negócios (como a recuperação, criação, atualização e exclusão de postagens) seja delegada ao serviço,
  // Mantendo a controladora focada apenas em gerenciar as requisições HTTP.
  // 'private': A propriedade postagemService só pode ser acessada dentro da classe em que foi definida. Ela não estará disponível fora dessa classe;
  // 'readonly': Após a propriedade postagemService ser inicializada, ela não pode ser reatribuída. Por exemplo: this.postagemService = novoServico. Sem o modificador readonly, você poderia sobrescrever postagemService dentro da classe, o que pode levar a comportamentos inesperados.

  @Get()
  @HttpCode(HttpStatus.OK) // Status 200 - Operação realizada com êxito. Caso ocorra algum erro durante o processamento, o código de status será ajustado de acordo com o tipo de erro.
  findAll(): Promise<Postagem[]> {
    return this.postagemService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem> {
    // A Classe ParseIntPipe é utilizada para garantir que o valor de id seja tratado como um número inteiro.
    // Por questões de boas práticas e legibilidade do código, a Variável de Caminho e o Parâmetro do Método devem possuir o mesmo nome.
    return this.postagemService.findById(id);
  }

  @Get('/titulo/:titulo')
  @HttpCode(HttpStatus.OK)
  findAllByTitulo(@Param('titulo') titulo: string): Promise<Postagem[]> {
    return this.postagemService.findAllByTitulo(titulo);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED) // Status 201 - Created
  // @Body(): Este decorador acessa o Objeto postagem enviado no corpo da Requisição e insere no Objeto postagem (parâmetro) do Método create(@Body() postagem: Postagem);
  create(@Body() postagem: Postagem): Promise<Postagem> {
    return this.postagemService.create(postagem);
  }

  @Put() // Mapeia todas as Requisições HTTP PUT. Ou seja, indica que o Método update(@Body() postagem: Postagem), responderá a todas as requisições do tipo HTTP PUT, enviadas ao endpoint.
  @HttpCode(HttpStatus.OK)
  update(@Body() postagem: Postagem): Promise<Postagem> {
    return this.postagemService.update(postagem);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT) // NO_CONTENT 🡪 204 (o Objeto não existe, pois foi apagado do BD).
  delete(@Param('id', ParseIntPipe) id: number) { // A instrução ParseIntPipe converte o valor da variável de caminho id (inicialmente uma string) em um número.
    return this.postagemService.delete(id);
  }
}

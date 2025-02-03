import { TemaService } from './../../tema/services/tema.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Postagem } from './../entities/postagem.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, ILike, Repository } from 'typeorm'; // Utilizada para implementar Repository Pattern (Padrão de Repositório), para facilitar a abstração da persistência de dados. Além disso, o Repository Pattern atua como uma coleção de objetos em memória, oferecendo métodos de acesso a dados (como find, save, update, delete), sem que a aplicação se preocupe com os detalhes específicos da implementação da base de dados, como as consultas SQL ou a configuração de conexões.

@Injectable() // Indica que a classe é um serviço, ou seja, uma classe que pode ser injetada em outras classes por meio da Injeção de Dependências.
export class PostagemService {
  // O constructor recebe as injeções de dependência necessárias para o desenvolvimento da classe de serviço.
  constructor(
    @InjectRepository(Postagem) // Indica a classe entity que será utilizada pela injeção de dependência da classe 'Repository'. Sendo assim, 'postagemRepository' (injeção de dependência) está associado à entidade 'Postagem'.
    private postagemRepository: Repository<Postagem>, // Definição do objeto 'postagemRepository' para executar os métodos da classe 'Repository'.
    private temaService: TemaService, // Injeção de dependência, para ter acesso aos métodos da classe TemaService.
  ) {}

  async findAll(): Promise<Postagem[]> {
    // SELECT * FROM tb_postagens;
    return await this.postagemRepository.find({
      relations: {
        tema: true,
        usuario: true,
      },
    });
  }

  async findById(id: number): Promise<Postagem> {
    // SELECT * FROM tb_postagens WHERE id = ?;
    const postagem = await this.postagemRepository.findOne({
      // O await faz com que a execução do código aguarde até que a Promise retornada por 'this.postagemRepository.findOne' seja resolvida.
      // Ou seja, o código só prossegue após o objeto Postagem ser encontrado (ou a Promise ser rejeitada), e o resultado será atribuído à variável postagem.
      where: {
        id,
      },
      relations: {
        tema: true,
        usuario: true,
      },
    });

    if (!postagem)
      // Caso o 'id' informado não corresponda a nenhuma postagem existente no banco de dados, o método findOne() retornará null.
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND); // HTTP 404 - Not Found.

    return postagem;
  }

  async findAllByTitulo(titulo: string): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      where: {
        titulo: ILike(`%${titulo}%`), // SELECT * FROM tb_postagens where titulo like "%titulo%";
        // ILike - Insensitive Like (ignora se a string foi digitada com letras maiúsculas ou minúsculas). Este método converte a string para letras maiúsculas, e depois faz a comparação;
        // Like - Sensitive Like (NÃO ignora se a string está em maiúsculo ou minúsculo, ou seja, ele faz uma busca literal).
      },
      relations: {
        tema: true,
        usuario: true,
      },
    });
  }

  async create(postagem: Postagem): Promise<Postagem> {
    // O parâmetro postagem do método é preenchido com os dados enviados pelo cliente no corpo da requisição HTTP (Request Body)
    // e será encaminhado pela PostagemController para o método create do PostagemService para que a persistência seja executada.

    await this.temaService.findById(postagem.tema.id);

    // INSERT INTO tb_postagens (titulo, texto, data) VALUES ("Título", "Texto", CURRENT_TIMESTAMP());
    return await this.postagemRepository.save(postagem);
  }

  async update(postagem: Postagem): Promise<Postagem> {
    if (!postagem.id || postagem.id <= 0)
      throw new HttpException('Postagem inválida!', HttpStatus.BAD_REQUEST);

    await this.findById(postagem.id);

    await this.temaService.findById(postagem.tema.id);

    // UPDATE tb_postagens SET titulo = postagem.titulo, texto = postagem.texto, data = CURRENT_TIMESTAMP() WHERE id = postagem.id;
    return await this.postagemRepository.save(postagem); // O método save() da classe Repository pode ser usado tanto para persistir um novo objeto quanto para atualizar um objeto existente no banco de dados.
  }

  // DeleteResult: É uma Classe do pacote TypeORM, que armazena o resultado da operação delete. Nulo = operação falhou / Não Nulo = a operação delete deu certo e o Objeto foi apagado.
  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    // DELETE FROM tb_postagens WHERE id = id;
    return await this.postagemRepository.delete(id);
  }
}

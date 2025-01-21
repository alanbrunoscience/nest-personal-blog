import { InjectRepository } from '@nestjs/typeorm';
import { Postagem } from './../entities/postagem.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm'; // Utilizada para implementar Repository Pattern (Padrão de Repositório), para facilitar a abstração da persistência de dados. Além disso, o Repository Pattern atua como uma coleção de objetos em memória, oferecendo métodos de acesso a dados (como find, save, update, delete), sem que a aplicação se preocupe com os detalhes específicos da implementação da base de dados, como as consultas SQL ou a configuração de conexões.

@Injectable() // Indica que a classe é um serviço, ou seja, uma classe que pode ser injetada em outras classes por meio da Injeção de Dependências.
export class PostagemService {
  // O constructor recebe as injeções de dependência necessárias para o desenvolvimento da classe de serviço.
  constructor(
    @InjectRepository(Postagem) // Indica a classe entity que será utilizada pela injeção de dependência da classe 'Repository'. Sendo assim, 'postagemRepository' (injeção de dependência) está associado à entidade 'Postagem'.
    private postagemRepository: Repository<Postagem>, // Definição do objeto 'postagemRepository' para executar os métodos da classe 'Repository'.
  ) {}

  async findAll(): Promise<Postagem[]> {
    return await this.postagemRepository.find(); // SELECT * FROM tb_postagens;
  }
}

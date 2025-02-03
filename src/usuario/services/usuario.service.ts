import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './../entities/usuario.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private bcrypt: Bcrypt, // Importação realizada para a criptografia do atributo 'senha' antes da persistência do objeto da classe 'Usuario' no Banco de Dados.
  ) {}

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
      relations: {
        postagens: true,
      },
    });
  }

  async findById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        id,
      },
      relations: {
        postagens: true,
      },
    });

    if (!usuario)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

    return usuario;
  }

  // Método auxiliar para validação do usuário. Esse método é fundamental para o funcionamento do Passport, garantindo que apenas usuários válidos e registrados possam realizar operações de login ou alterações nos dados.
  async findByUsuario(usuario: string): Promise<Usuario | undefined> {
    // SELECT * FROM tb_usuarios WHERE usuario = usuario_procurado;
    return await this.usuarioRepository.findOne({
      where: {
        usuario: usuario,
      },
      relations: {
        postagens: true,
      },
    });
  }

  async create(usuario: Usuario): Promise<Usuario> {
    const buscaUsuario = await this.findByUsuario(usuario.usuario);

    if (buscaUsuario)
      throw new HttpException('O Usuário já existe!', HttpStatus.BAD_REQUEST); // BAD REQUEST 🡪 400

    usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);

    return await this.usuarioRepository.save(usuario);
  }

  async update(usuario: Usuario): Promise<Usuario> {
    await this.findById(usuario.id);

    const buscaUsuario = await this.findByUsuario(usuario.usuario);

    if (buscaUsuario && buscaUsuario.id !== usuario.id)
      throw new HttpException(
        'O Usuário (e-mail) que você está tentando atualizar já pertence a outro usuário!',
        HttpStatus.BAD_REQUEST,
      );

    usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);

    return await this.usuarioRepository.save(usuario);
  }
}

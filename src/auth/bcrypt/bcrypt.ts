import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable() // Utilizado para marcar a classe como um Serviço, permitindo que ela seja injetada em outras classes através da Injeção de Dependências do NestJS.
export class Bcrypt {
  async criptografarSenha(senha: string): Promise<string> {
    // Saltos (salts): É um valor aleatório gerado para garantir que até senhas iguais resultem em hashes diferentes. O salt é concatenado à senha antes de ser passado para a função de hash.
    const saltos: number = 10; // Este valor indica quantas vezes o algoritmo de hash (bcrypt) deve ser executado sobre a senha e o salt. Quanto maior o número de saltos, mais vezes o algoritmo aplica o hash, o que torna o processo de computação mais lento, mas também mais seguro.
    return await bcrypt.hash(senha, saltos); // O método hash(senha, saltos) da classe bcrypt é utilizado para criptografar a senha. Este método gera o hash da senha, aplicando os saltos e o algoritmo Bcrypt, garantindo que a senha seja armazenada de forma segura no banco de dados.
  }

  async compararSenhas(
    senhaDigitada: string,
    senhaBanco: string,
  ): Promise<boolean> {
    return await bcrypt.compare(senhaDigitada, senhaBanco); // Este Método retornará true se a senha digitada for igual a senha persistida no Banco de dados.
  }
}

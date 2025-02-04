import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tema } from '../../tema/entities/tema.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_postagens' }) // CREATE TABLE tb_postagens()
export class Postagem {
  @PrimaryGeneratedColumn() // AUTO_INCREMENT PRIMARY KEY
  @ApiProperty()
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty() // Validação dos dados do objeto.
  @Column({ length: 100, nullable: false }) // VARCHAR(100) NOT NULL | nullable: false = o atributo NÃO pode ser nulo.
  @ApiProperty()
  titulo: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty() // Validação dos dados do objeto.
  @Column({ length: 1000, nullable: false }) // VARCHAR(1000) NOT NULL
  @ApiProperty()
  texto: string;

  @UpdateDateColumn()
  @ApiProperty()
  data: Date; // Timestamp: Representa um instante único, um ponto específico na linha do tempo, e seu valor corresponde a uma determinada quantidade de tempo decorrida a partir de um instante inicial.

  @ApiProperty({ type: () => Tema })
  // O decorator @ManyToOne indica que a Classe Postagem será o lado N:1 da relação e terá um Objeto da Classe Tema, chamado tema, que no modelo Relacional será a Chave Estrangeira na Tabela tb_postagens (temaId).
  @ManyToOne(() => Tema, (tema) => tema.postagens, {
    onDelete: 'CASCADE', // O "cascateamento" foi habilitado apenas na operação Delete, ou seja, apenas quando um Objeto da Classe Tema for apagado, todos os Objetos da Classe Postagem associados ao Tema também serão apagados. O Inverso não é verdadeiro.
  })
  tema: Tema; // Será criado um Objeto da Classe Tema, que receberá os dados do Tema associado ao Objeto da Classe Postagem. Este Objeto representa a Chave Estrangeira da Tabela tb_postagens (temaid).

  @ApiProperty({ type: () => Usuario })
  @ManyToOne(() => Usuario, (usuario) => usuario.postagens, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;
}

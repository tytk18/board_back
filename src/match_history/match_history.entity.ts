import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Cat } from '../cat/cat.entity';
import { Game } from '../game/game.entity';
import { User } from '../user/user.entity';
import { GameResult } from './result.meta';

@Entity()
export class MatchHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(()=> User, user=>user.history, {nullable: false, onDelete: 'CASCADE'})
  player: User;

  @ManyToOne(()=> User, user=>user.history, {nullable: false})
  partner: User;

  @Column()
  result: GameResult;

  @ManyToOne(()=>Game, game=>game.history, {nullable: false})
  game: Game;

  @CreateDateColumn()
  time: Date;

//   @OneToMany(() => Cat, cat => cat.user)
//   cats: Cat[];
}
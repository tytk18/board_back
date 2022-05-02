import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Game } from '../game/game.entity';
import { User } from '../user/user.entity';
import { GameResult } from './result.meta';

@Entity()
export class MatchHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.history, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  player: User;

  @ManyToOne(() => User, (user) => user.history, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  partner: User;

  @Column()
  result: GameResult;

  @ManyToOne(() => Game, (game) => game.history, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  game: Game;

  @CreateDateColumn()
  time: Date;
}

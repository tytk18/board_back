import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Cat } from '../cat/cat.entity';
import { MatchHistory } from '../match_history/match_history.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(()=>MatchHistory, match_history => match_history.game)
  history: History[];

//   @OneToMany(() => Cat, cat => cat.user)
//   cats: Cat[];
}
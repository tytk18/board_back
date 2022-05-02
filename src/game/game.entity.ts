import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MatchHistory } from '../match_history/match_history.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  explanation: string;

  @Column()
  imageUrl: string;

  @OneToMany(() => MatchHistory, (match_history) => match_history.game)
  history: History[];
}

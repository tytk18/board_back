import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MatchHistory } from '../match_history/match_history.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(()=> MatchHistory, match_history=>match_history.player)
  history: History[];

  // @OneToMany(()=> History, history=>history.partner)
  // partnerhistory: History[];
//   @OneToMany(() => Cat, cat => cat.user)
//   cats: Cat[];
}
import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MatchHistory } from '../match_history/match_history.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  encryptedPassword: string;

  @Exclude()
  @Column()
  cryptoSalt: string;

  @OneToMany(() => MatchHistory, (match_history) => match_history.player)
  history: History[];

  @Column()
  isAdmin: boolean;
}

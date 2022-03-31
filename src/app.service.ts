import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlainObjectToNewEntityTransformer } from 'typeorm/query-builder/transformer/PlainObjectToNewEntityTransformer';
import { Cat } from './cat/cat.entity';
import { GameDto } from './game/game.dto';
import { Game } from './game/game.entity';
import { MatchHistory } from './match_history/match_history.entity';
import { Match_HistoryDto } from './match_history/match_history.dto';
import { UserDto } from './user/user.dto';
import { User } from './user/user.entity';
import { domainToASCII } from 'url';
import { UserService } from './user/user.service';

@Injectable()
export class AppService {
  // getuser() {
  //   throw new Error('Method not implemented.');
  // }
  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    @InjectRepository(MatchHistory)
    private match_historyRepository: Repository<MatchHistory>,
    private readonly userService: UserService
  ) {
    // this.init();
  }

  // async init() {
  //   await this.usersRepository.save({ name: 'hoho'});
  //   const user = await this.usersRepository.findOne({id: 1});
  //   this.catRepository.save({ name: 'f', users: [{ id: 2 }, {id: 3}]});
  // }

  gethistory(){
    return this.match_historyRepository.find({relations:["player","partner","game"]});
  }

  async posthistory(dto : Match_HistoryDto){
    const existPlayer = await this.userService.findUser(dto.player_name);
    const existPartner = await this.userService.findUser(dto.partner_name);
    const existGame = await this.gameRepository.findOne({name: dto.game});

    console.log(existPlayer);

    return this.match_historyRepository.save({
      player: existPlayer,
      partner: existPartner,
      result: dto.result,
      game: existGame,
    })
  }

  
  getgame(){
    return this.gameRepository.find({
    });
  }

  postgame(dto : GameDto){
    return this.gameRepository.save({
      name: dto.name
    });
  }

  async getuserhistory(player: string){
    const existPlayer = this.userService.findUser(player);
    
    return this.match_historyRepository.find({
      where: {
        player : existPlayer
        //player: {id: player}
      }
      ,relations: ["player","partner","game"]//id로 search하고 싶을때?//relation정확한쓰임새
    })
  }
  // find() {
  //   // return this.catRepository.find();
  //   return this.userRepository.find({ relations: ['cats'] });
  // }

  // findAll(): Promise<User[]> {
  //   return this.userRepository.find({ order: { id: "ASC"}, where: {name: 'dfds'}});
  // }

  // findOne(id: string): Promise<User> {
  //   return this.userRepository.findOne({name: 'fdfd'});
  // }

  // async remove(id: string): Promise<void> {
  //   await this.userRepository.delete(id);
  // }
  
  // getHello(): string {
  //   return 'Hello World!';
  // }
}

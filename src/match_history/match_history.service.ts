import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameService } from 'src/game/game.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { MatchHistoryDto } from './match_history.dto';
import { MatchHistory } from './match_history.entity';

@Injectable()
export class MatchHistoryService {
  constructor(
    @InjectRepository(MatchHistory)
    private matchhistoryRepository: Repository<MatchHistory>,
    private readonly gameService: GameService,
    private readonly userService: UserService,
  ) {}

  gethistory() {
    return this.matchhistoryRepository
      .createQueryBuilder('match_history')
      .leftJoinAndSelect('match_history.player', 'player')
      .leftJoinAndSelect('match_history.partner', 'partner')
      .leftJoinAndSelect('match_history.game', 'game')
      .select(['match_history', 'player.name', 'partner.name', 'game'])
      .take(1)
      .skip(0)
      .getOne();

    return this.matchhistoryRepository.find({
      relations: ['player', 'partner', 'game'],
    });
  }

  async getuserhistory(player: string) {
    const existPlayer = this.userService.findUser(player);

    return this.matchhistoryRepository.find({
      where: {
        player: existPlayer,
        //player: {id: player}
      },
      relations: ['player', 'partner', 'game'], //id로 search하고 싶을때?//relation정확한쓰임새
    });
  }

  async posthistory(dto: MatchHistoryDto) {
    const existPlayer = await this.userService.findUser(dto.player_name);
    const existPartner = await this.userService.findUser(dto.partner_name);
    const existGame = await this.gameService.findGame(dto.game);

    console.log(existPlayer);

    return this.matchhistoryRepository.save({
      player: existPlayer,
      partner: existPartner,
      result: dto.result,
      game: existGame,
    });
  }
}

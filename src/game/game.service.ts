import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/game/game.entity';
import { Repository } from 'typeorm';
import { GameDto } from './game.dto';

@Injectable()
export class GameService {
  userService: any;
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  getgame() {
    return this.gameRepository.find({});
  }

  getgameone(name: string) {
    return this.gameRepository.findOne({ name: name });
  }

  postgame(dto: GameDto) {
    return this.gameRepository.save({
      name: dto.name,
      explanation: dto.explanation,
      imageUrl: dto.imageUrl,
    });
  }

  findGame(name: string) {
    return this.gameRepository.findOne({ name: name });
  }
}

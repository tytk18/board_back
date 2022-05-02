import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { GameResult } from './result.meta';

export class MatchHistoryDto {
  @ApiProperty({ description: '플레이어 이름' })
  @IsString()
  player_name: string;

  @ApiProperty({ description: '파트너 이름' })
  @IsString()
  partner_name: string;

  @ApiProperty({ description: '승/패' })
  @IsString()
  result: GameResult;

  @ApiProperty({ description: '보드게임 종류' })
  @IsString()
  game: string;
}

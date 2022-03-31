
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Max, IsEmail } from 'class-validator';
import { GameResult } from './result.meta';

export class Match_HistoryDto {
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

  // @ApiProperty({ description: '날짜 ex)20220303' })
  // @IsInt()
  // time: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Max, IsEmail } from 'class-validator';

export class GameDto {
  @ApiProperty({ description: '보드게임 이름' })
  @IsString()
  name: string;
}
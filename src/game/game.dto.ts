import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GameDto {
  @ApiProperty({ description: '보드게임 이름' })
  @IsString()
  name: string;

  @ApiProperty({ description: '보드게임 설명' })
  @IsString()
  explanation: string;

  @ApiProperty({ description: '보드게임 이미지 프론트 주소' })
  @IsString()
  imageUrl: string;
}

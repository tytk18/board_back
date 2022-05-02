import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TokenDto {
  @ApiProperty({ description: '토큰' })
  @IsString()
  token: string;
}

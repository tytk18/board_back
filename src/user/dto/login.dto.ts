import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: '이메일' })
  @IsEmail()
  email: string;
  @ApiProperty({ description: '암호' })
  password: string;
}

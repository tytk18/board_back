import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MaxLength, MinLength } from 'class-validator';

export class UserDto {
  @ApiProperty({ description: '이름' })
  @IsString()
  name: string;

  @ApiProperty({ description: '이메일' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '암호' })
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @ApiProperty({ description: '관리자인가요?' })
  isadmin: boolean;
}

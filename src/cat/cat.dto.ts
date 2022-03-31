
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Max, IsEmail } from 'class-validator';

export class CreateCatDto {
  @ApiProperty({ description: '이름' })
  @IsString()
  name: string;

  @ApiProperty({ description: '나이' })
  @IsInt()
  @Max(40)
  age: number;

  @IsEmail()
  email: string;
}
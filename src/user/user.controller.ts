import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(private readonly appService: UserService) {}

    @ApiOperation({ summary: '유저 조회', description: '유저를 조회합니다.' })
    @Get()
    getuser(){
      return this.appService.getuser();
    }
  
    // @ApiOperation({ summary: '유저 승률 조회', description: '해당 유저의 게임 승률을 조회합니다.' })
    // @Get('user/:a/:b')
    // getuserodds(@Param('player, game') player:string, game:string){
    //   return this.appService.getuserodds(player,game);
    // }
  
    @ApiOperation({ summary: '유저 생성', description: '유저를 생성합니다.' })
    @Post()
    postuser(@Body(new ValidationPipe()) userDto: UserDto) {
      return this.appService.postuser(userDto);
    }

}

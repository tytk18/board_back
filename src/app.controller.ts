import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post, Query, Render, ValidationPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { CreateCatDto } from './cat/cat.dto';
import { GameDto } from './game/game.dto';
import { Match_HistoryDto } from './match_history/match_history.dto';
import { UserDto } from './user/user.dto';
import { MatchHistory } from './match_history/match_history.entity'

@Controller()
@ApiTags('멍멍')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: '전적 조회', description: '게임 전적을 조회합니다.' })
  @Get('history')
  gethistory(){
    return this.appService.gethistory();
  }

  @ApiOperation({ summary: '전적 생성', description: '게임 전적을 생성합니다.' })
  @Post('history')
  posthistory(@Body(new ValidationPipe()) match_historyDto: Match_HistoryDto) {
    return this.appService.posthistory(match_historyDto);
  }


  @ApiOperation({ summary: '게임 조회', description: '게임 리스트를 조회합니다.' })
  @Get('game')
  getgame(){
    return this.appService.getgame();
  }

  @ApiOperation({ summary: '게임 생성', description: '새로운 보드게임을 추가합니다.' })
  @Post('game')
  postgame(@Body(new ValidationPipe()) gameDto: GameDto) {
    return this.appService.postgame(gameDto);
  }

  @ApiOperation({ summary: '유저 전적 조회', description: '해당 유저의 전적을 조회합니다.' })
  @Get('game/user')
  getuserhistory(@Query('player') player:string){
    return this.appService.getuserhistory(player);
  }
  
  // @Get('cat')
  // find() {
  //   return this.appService.find();
  // }

  // @Get()
  // @ApiOperation({ summary: '유저 생성 API', description: '유저를 생성한다.' })
  // getHello(): string {
  //   console.log("???");
  //   throw new BadRequestException('dfdfd');
  //   return this.appService.getHello();
  // }

  // @Get('add/:id')
  // getHello2(@Param('id', ParseIntPipe) id: number): number {
  //   console.log("!!!");
  //   return id+3;
  //   // return this.appService.getHello();
  // }

  // @Post()
  // create(
  //   @Body(new ValidationPipe()) createCatDto: CreateCatDto,
  // ) {
  //   return createCatDto.age + 1;
  // }

  // @Get('mypage')
  // @Render('index')
  // hihi() {
  //   const user = ["hihi", "hoho"];

  //   return {message: '멍청새!', users: user};
  // }

  // @Get('mypage2')
  // @Render('test')
  // hihi2() {
  //   const user = ["hihi", "hoho"];

  //   return {message: '멍청새!', users: user};
  // }
}

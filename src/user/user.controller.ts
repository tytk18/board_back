import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from './administrator/admin.guard';
import { AdminDto } from './dto/admin.dto';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';
import { UserDto } from './dto/user.dto';
import { UserGuard } from './user.guard';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly appService: UserService) {
    this.init();
  }

  async init() {
    const firstuser = {
      name: '강태영',
      email: 'tytk18@postech.ac.kr',
      password: 'sksmsrhksflwk',
      isadmin: true,
    };
    await this.appService.postuser(firstuser); // isadmin값이 false로 들어갑니다
    this.appService.postadmin(firstuser); // isadmin값이 true로 들어갑니다
  }

  @Get('hihi')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  getuser2() {
    return this.appService.getAllUser();
  }

  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '유저 조회', description: '유저를 조회합니다.' })
  @Get(':uuid')
  getuser(@Param('uuid') uuid: string) {
    //return req.user;
    return this.appService.getuser(uuid);
  }

  // @ApiOperation({ summary: '유저 승률 조회', description: '해당 유저의 게임 승률을 조회합니다.' })
  // @Get('user/:a/:b')
  // getuserodds(@Param('player, game') player:string, game:string){
  //   return this.appService.getuserodds(player,game);
  // }

  @ApiOperation({ summary: '유저 생성', description: '유저를 생성합니다.' })
  @Post('user')
  postuser(@Body(new ValidationPipe()) userDto: UserDto) {
    return this.appService.postuser(userDto);
  }

  @ApiOperation({ summary: '로그인', description: '로그인' })
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.appService.login(dto.email, dto.password);
  }

  @ApiOperation({ summary: '토큰 검증', description: '토큰을 검증합니다' })
  @Post('token')
  verify(@Body() dto: TokenDto) {
    return this.appService.verifyToken(dto.token);
  }

  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '관리자 생성', description: '관리자를 생성합니다.' })
  @Post('admin')
  postadmini(@Body(new ValidationPipe()) adminiDto: AdminDto) {
    return this.appService.postadmin(adminiDto);
  }
}

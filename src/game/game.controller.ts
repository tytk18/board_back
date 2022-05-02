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
import { AdminGuard } from 'src/user/administrator/admin.guard';
import { GameDto } from './game.dto';
import { GameService } from './game.service';

@Controller('game')
@ApiTags('game')
export class GameController {
  constructor(private readonly appService: GameService) {}

  @ApiOperation({
    summary: '게임 전체 조회',
    description: '게임 리스트를 전체 조회합니다.',
  })
  @Get()
  getgame() {
    return this.appService.getgame();
  }

  @ApiOperation({
    summary: '게임 개별 조회',
    description: '게임 리스트를 개별 조회합니다.',
  })
  @Get(':name')
  getgameone(@Param('name') name: string) {
    return this.appService.getgameone(name);
  }

  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '게임 생성',
    description: '새로운 보드게임을 추가합니다.',
  })
  @Post()
  postgame(@Body(new ValidationPipe()) gameDto: GameDto) {
    return this.appService.postgame(gameDto);
  }
}

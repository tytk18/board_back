import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/user/administrator/admin.guard';
import { MatchHistoryDto } from './match_history.dto';
import { MatchHistoryService } from './match_history.service';

@Controller('history')
@ApiTags('match history')
export class MatchHistoryController {
  constructor(private readonly appService: MatchHistoryService) {}

  @ApiOperation({
    summary: '전적 조회',
    description: '게임 전적을 조회합니다.',
  })
  @Get()
  gethistory() {
    return this.appService.gethistory();
  }

  @ApiOperation({
    summary: '유저 전적 조회',
    description: '해당 유저의 전적을 조회합니다.',
  })
  @Get('game/user')
  getuserhistory(@Query('player') player: string) {
    return this.appService.getuserhistory(player);
  }

  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '전적 생성',
    description: '게임 전적을 생성합니다.',
  })
  @Post()
  posthistory(@Body(new ValidationPipe()) match_historyDto: MatchHistoryDto) {
    return this.appService.posthistory(match_historyDto);
  }
}

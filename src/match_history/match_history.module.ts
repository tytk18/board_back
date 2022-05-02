import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameModule } from 'src/game/game.module';
import { UserModule } from 'src/user/user.module';
import { MatchHistoryController } from './match_history.controller';
import { MatchHistory } from './match_history.entity';
import { MatchHistoryService } from './match_history.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([MatchHistory]),
    GameModule,
    UserModule,
    JwtModule.register({
      secret: 'hihi',
    }),
  ],
  controllers: [MatchHistoryController],
  providers: [MatchHistoryService],
  exports: [MatchHistoryService],
})
export class MatchHistoryModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { GameController } from './game.controller';
import { Game } from './game.entity';
import { GameService } from './game.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Game]),
    JwtModule.register({
      secret: 'hihi',
    }),
    UserModule,
  ],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}

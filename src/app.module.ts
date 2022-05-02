import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger.middleware';
import { UserModule } from './user/user.module';
import { MatchHistoryModule } from './match_history/match_history.module';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature(),
    UserModule,
    MatchHistoryModule,
    GameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('add');
  }
}

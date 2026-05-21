import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { SongsController } from './songs/songs.controller';
import { SongsService } from './songs/songs.service';
import { DbModule } from './db/db.module';  
import { LoggerModule } from './common/middleware/logger/logger.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';

@Module({
  imports: [SongsModule, DbModule, LoggerModule],
  controllers: [AppController, SongsController],
  providers: [AppService, SongsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('songs');
  }
}

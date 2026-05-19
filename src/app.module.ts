import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { SongsController } from './songs/songs.controller';
import { SongsService } from './songs/songs.service';
import { DbModule } from './db/db.module';  

@Module({
  imports: [SongsModule, DbModule],
  controllers: [AppController, SongsController],
  providers: [AppService, SongsService],
})
export class AppModule {}

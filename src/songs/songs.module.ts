import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { Song } from './entities/song.entity';
import { Playlist } from '../playlists/entities/playlist.entity';
import { Artist } from '../artists/entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song, Playlist, Artist])],
  providers: [SongsService],
  controllers: [SongsController],
})
export class SongsModule { }

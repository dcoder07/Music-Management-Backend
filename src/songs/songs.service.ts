import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSongRequest, CreateSongResponse } from './dto/createSongReqRes';
import { GetAllSongsResponse, SongDTO } from './dto/getAllSongsRes';
import { Song } from './entities/song.entity';

@Injectable()
export class SongsService {
    constructor(
        @InjectRepository(Song)
        private readonly songRepository: Repository<Song>,
    ) { }

    async getAllSongs(): Promise<GetAllSongsResponse> {
        const response = await this.songRepository.find();
        if (!response) {
            throw new NotFoundException('Songs not found');
        }
        return { songs: response, isSuccess: true };
    }

    async createSong(requestBody: CreateSongRequest): Promise<CreateSongResponse> {
        const response = this.songRepository.create(requestBody);
        const songSavedRes = await this.songRepository.save(response);
        if (!response || !songSavedRes) {
            throw new NotFoundException('Failed to save song to database');
        }
        return { isSuccess: true };
    }

    async getSongById(id: number): Promise<SongDTO> {
        const response = await this.songRepository.findOne({ where: { song_id: id } });
        if (!response) {
            throw new NotFoundException('Song not found');
        }
        return response;
    }
}
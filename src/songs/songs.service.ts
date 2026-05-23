import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSongRequest, SongResponse} from './dto/createSongReqRes';
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

    async createSong(requestBody: CreateSongRequest): Promise<SongResponse> {
        const response = this.songRepository.create(requestBody);
        const songSavedRes = await this.songRepository.save(response);
        if (!response || !songSavedRes) {
            throw new NotFoundException('Failed to save song to database');
        }
        return { message: 'Song created successfully', data: songSavedRes, isSuccess: true };
    }

    async getSongById(id: number): Promise<SongDTO> {
        const response = await this.songRepository.findOne({ where: { song_id: id } });
        if (!response) {
            throw new NotFoundException('Song not found');
        }
        return response;
    }

    async deleteSong(id: number): Promise<{ isSuccess: boolean }> {
        const response = await this.songRepository.delete({ song_id: id });
        if (!response) {
            throw new NotFoundException('Failed to delete song');
        }
        return { isSuccess: true };
    }

    async updateSong(id: number, requestBody: CreateSongRequest): Promise<SongResponse> {
        const response = await this.songRepository.update({ song_id: id }, requestBody);
        if (!response) {
            throw new NotFoundException('Failed to update song');
        }
        return { message: 'Song updated successfully', isSuccess: true };
    }
}

import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {CreateSongRequest, CreateSongResponse} from './dto/createSongReqRes';
import { GetAllSongsResponse, Song } from './dto/getAllSongsRes';
@Injectable()
export class SongsService {
    constructor(@Inject('POSTGRES_POOL') private readonly sql: any) { }
    async getAllSongs(): Promise<GetAllSongsResponse> {
        const result = await this.sql.query(`SELECT * FROM public.songs`);
        return result;
    }

    async createSong(requestBody: CreateSongRequest): Promise<CreateSongResponse> {
        const result = await this.sql.query(`INSERT INTO public.songs (title, artist, duration_seconds, release_date, language) VALUES ($1, $2, $3, $4, $5)`, [requestBody.title, requestBody.artist, requestBody.duration_seconds, requestBody.release_date, requestBody.language]);
        return { isSuccess: true };
    }

    async getSongById(id: number): Promise<Song> {
        const result = await this.sql.query(`SELECT * FROM public.songs WHERE song_id = $1`, [id]);
        if(result.length === 0) {
            throw new NotFoundException('Song not found')
        }
        return result;
    }
}
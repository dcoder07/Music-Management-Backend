import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class SongDTO {

    song_id: number;

    title: string;

    artist: string;

    duration_seconds: number;

    @Type(() => Date)
    release_date: Date;

    language: string;

    @Type(() => Date)
    created_at: Date;
}

export class GetAllSongsResponse {
    
    @IsOptional()
    songs: SongDTO[];
    
    isSuccess: boolean;
}

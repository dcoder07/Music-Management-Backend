import { IsString, IsNotEmpty, IsNumber, IsDate, IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { SongDTO } from './getAllSongsRes';

export class CreateSongRequest {
  
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNumber()
  @IsNotEmpty()
  readonly duration_seconds: number;

  @IsDate()
  @Type(() => Date)
  readonly release_date: Date;

  @IsString()
  language: string;

}

export interface SongResponse {
  message: string;
  data?: SongDTO;
  isSuccess: boolean;
}
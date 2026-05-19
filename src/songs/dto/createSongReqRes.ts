import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSongRequest {
  
  @IsString()
  @IsNotEmpty()
  readonly title: string;
  
  @IsString()
  @IsNotEmpty()
  readonly artist: string;

  @IsNumber()
  @IsNotEmpty()
  readonly duration_seconds: number;

  @IsDate()
  @Type(() => Date)
  readonly release_date: Date;

  @IsString()
  language: string;

}

export interface CreateSongResponse {
  isSuccess: boolean;
}
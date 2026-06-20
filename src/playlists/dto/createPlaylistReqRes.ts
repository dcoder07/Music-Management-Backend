import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { PlaylistDTO } from './getAllPlaylistRes.js';

export class CreatePlaylistRequest {

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsOptional()
  readonly userId?: number;

}

export interface PlaylistResponse {
  message: string;
  data?: PlaylistDTO;
  isSuccess: boolean;
}

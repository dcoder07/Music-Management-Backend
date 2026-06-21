import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { ArtistDTO } from './getAllArtistsRes';

export class CreateArtistRequest {
  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;
}

export interface ArtistResponse {
  message: string;
  data?: ArtistDTO;
  isSuccess: boolean;
}

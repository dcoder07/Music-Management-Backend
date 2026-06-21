import { IsOptional } from 'class-validator';

export class ArtistDTO {
  id: number;
  user?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export class GetAllArtistsResponse {
  @IsOptional()
  artists: ArtistDTO[];

  isSuccess: boolean;
}

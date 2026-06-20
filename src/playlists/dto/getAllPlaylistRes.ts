import { IsOptional } from 'class-validator';

export class PlaylistDTO {

  id: number;

  name: string;

  user?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };

}

export class GetAllPlaylistsResponse {

  @IsOptional()
  playlists: PlaylistDTO[];

  isSuccess: boolean;
}

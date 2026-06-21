import { IsNumber, IsNotEmpty } from 'class-validator';

export class AddSongToPlaylistRequest {
  @IsNumber()
  @IsNotEmpty()
  readonly songId: number;

  @IsNumber()
  @IsNotEmpty()
  readonly playlistId: number;
}

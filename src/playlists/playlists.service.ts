import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaylistRequest, PlaylistResponse } from './dto/createPlaylistReqRes';
import { GetAllPlaylistsResponse, PlaylistDTO } from './dto/getAllPlaylistRes';
import { Playlist } from './entities/playlist.entity';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>,
  ) {}

  async getAllPlaylists(): Promise<GetAllPlaylistsResponse> {
    const response = await this.playlistRepository.find();
    if (!response) {
      throw new NotFoundException('Playlists not found');
    }
    return { playlists: response, isSuccess: true };
  }

  async createPlaylist(requestBody: CreatePlaylistRequest): Promise<PlaylistResponse> {
    const response = this.playlistRepository.create(requestBody);
    const playlistSavedRes = await this.playlistRepository.save(response);
    if (!response || !playlistSavedRes) {
      throw new NotFoundException('Failed to save playlist to database');
    }
    return { message: 'Playlist created successfully', data: playlistSavedRes, isSuccess: true };
  }

  async getPlaylistById(id: number): Promise<PlaylistDTO> {
    const response = await this.playlistRepository.findOne({ where: { id: id } });
    if (!response) {
      throw new NotFoundException('Playlist not found');
    }
    return response;
  }

  async updatePlaylist(id: number, requestBody: CreatePlaylistRequest): Promise<PlaylistResponse> {
    const response = await this.playlistRepository.update({ id: id }, requestBody);
    if (!response) {
      throw new NotFoundException('Failed to update playlist');
    }
    return { message: 'Playlist updated successfully', isSuccess: true };
  }

  async deletePlaylist(id: number): Promise<{ isSuccess: boolean }> {
    const response = await this.playlistRepository.delete({ id: id });
    if (!response) {
      throw new NotFoundException('Failed to delete playlist');
    }
    return { isSuccess: true };
  }
}

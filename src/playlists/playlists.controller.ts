import { Controller, Get, Post, Put, Param, Body, ParseIntPipe } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistRequest, PlaylistResponse } from './dto/createPlaylistReqRes';
import { GetAllPlaylistsResponse, PlaylistDTO } from './dto/getAllPlaylistRes';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Get()
  async findAll(): Promise<GetAllPlaylistsResponse> {
    try {
      return await this.playlistsService.getAllPlaylists();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<PlaylistDTO> {
    try {
      return await this.playlistsService.getPlaylistById(id);
    } catch (error) {
      throw error;
    }
  }

  @Post()
  async create(@Body() body: CreatePlaylistRequest): Promise<PlaylistResponse> {
    try {
      return await this.playlistsService.createPlaylist(body);
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async update(@Param('id', new ParseIntPipe()) id: number, @Body() body: CreatePlaylistRequest): Promise<PlaylistResponse> {
    try {
      return await this.playlistsService.updatePlaylist(id, body);
    } catch (error) {
      throw error;
    }
  }
}

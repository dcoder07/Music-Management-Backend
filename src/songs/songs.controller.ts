import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongRequest, SongResponse } from './dto/createSongReqRes';
import { GetAllSongsResponse, SongDTO } from './dto/getAllSongsRes';
import { AddSongToPlaylistRequest } from './dto/addSongToPlaylistReq';

@Controller('songs')
export class SongsController {
    constructor(private readonly songsService: SongsService) { }

    @Get()
    async findAll(): Promise<GetAllSongsResponse> {
        try {
            return await this.songsService.getAllSongs();
        } catch (error) {
            throw error;
        }
    }

    @Get(':id')
    async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<SongDTO> {
        try {
            return await this.songsService.getSongById(id);
        } catch (error) {
            throw error;
        }
    }

    @Post()
    async create(@Body() body: CreateSongRequest): Promise<SongResponse> {
        try {
            return await this.songsService.createSong(body);
        } catch (error) {
            throw error;
        }
    }

    @Put(':id')
    async update(@Param('id', new ParseIntPipe()) id: number, @Body() body: CreateSongRequest): Promise<SongResponse> {
        try {
            return await this.songsService.updateSong(id, body);
        } catch (error) {
            throw error;
        }
    }

    @Delete(':id')
    async delete(@Param('id', new ParseIntPipe()) id: number): Promise<{ isSuccess: boolean }> {
        try {
            return await this.songsService.deleteSong(id);
        } catch (error) {
            throw error;
        }
    }

    @Post('add-to-playlist')
    async addToPlaylist(@Body() body: AddSongToPlaylistRequest): Promise<{ message: string; isSuccess: boolean }> {
        try {
            return await this.songsService.addSongToPlaylist(body);
        } catch (error) {
            throw error;
        }
    }
}

import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongRequest, CreateSongResponse } from './dto/createSongReqRes';
import { GetAllSongsResponse, Song } from './dto/getAllSongsRes';

@Controller('songs')
export class SongsController {
    constructor(private readonly songsService: SongsService) {}

    @Get()
    async findAll(): Promise<GetAllSongsResponse> {
        try {
            return await this.songsService.getAllSongs();
        } catch (error) {
            throw error;
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Song> {
        try {
            return await this.songsService.getSongById(id);
        } catch (error) {
            throw error;
        }
    }

    @Post()
    async create(@Body() body: CreateSongRequest): Promise<CreateSongResponse> {
        try {
            return await this.songsService.createSong(body);
        } catch (error) {
            throw error;
        }
    }

    @Put(':id')
    update():string {
        return "Update songs based on id";
    }

    @Delete(':id')
    delete():string {
        return "Delete songs based on id";
    }
}

import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongRequest, CreateSongResponse } from './dto/createSongReqRes';
import { GetAllSongsResponse } from './dto/getAllSongsRes';

@Controller('songs')
export class SongsController {
    constructor(private readonly songsService: SongsService) {}

    @Get()
    findAll():Promise<GetAllSongsResponse> {
        return this.songsService.getAllSongs();
    }

    @Get(':id')
    findOne(@Param('id') id: string):string {
        return `Get song by ${id}`;
    }

    @Post()
    async create(@Body() body: CreateSongRequest): Promise<CreateSongResponse> {
        return await this.songsService.createSong(body);
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

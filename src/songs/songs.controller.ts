import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
    constructor(private readonly songsService: SongsService) {}

    @Get()
    async findAll():Promise<any[]> {
        return await this.songsService.getAllSongs();
    }
    @Get(':id')
    findOne(@Param('id') id: string):string {
        return `Get song by ${id}`;
    }

    @Post()
    create():string {
        return "Create songs";
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

import { Controller, Get, Post, Put, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistRequest, ArtistResponse } from './dto/createArtistReqRes';
import { GetAllArtistsResponse, ArtistDTO } from './dto/getAllArtistsRes';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  async findAll(): Promise<GetAllArtistsResponse> {
    try {
      return await this.artistsService.getAllArtists();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<ArtistDTO> {
    try {
      return await this.artistsService.getArtistById(id);
    } catch (error) {
      throw error;
    }
  }

  @Post()
  async create(@Body() body: CreateArtistRequest): Promise<ArtistResponse> {
    try {
      return await this.artistsService.createArtist(body);
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async update(@Param('id', new ParseIntPipe()) id: number, @Body() body: CreateArtistRequest): Promise<ArtistResponse> {
    try {
      return await this.artistsService.updateArtist(id, body);
    } catch (error) {
      throw error;
    }
  }
}

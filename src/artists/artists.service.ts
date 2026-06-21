import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistRequest, ArtistResponse } from './dto/createArtistReqRes';
import { GetAllArtistsResponse, ArtistDTO } from './dto/getAllArtistsRes';
import { Artist } from './entities/artist.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllArtists(): Promise<GetAllArtistsResponse> {
    const response = await this.artistRepository.find({
      relations: {
        user: true,
      },
    });
    if (!response) {
      throw new NotFoundException('Artists not found');
    }
    return { artists: response, isSuccess: true };
  }

  async createArtist(requestBody: CreateArtistRequest): Promise<ArtistResponse> {
    const { userId } = requestBody;

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const artist = this.artistRepository.create({ user });
    const artistSavedRes = await this.artistRepository.save(artist);
    if (!artistSavedRes) {
      throw new NotFoundException('Failed to save artist to database');
    }
    const artistWithRelations = await this.artistRepository.findOne({
      where: { id: artistSavedRes.id },
      relations: {
        user: true,
      },
    });
    if (!artistWithRelations) {
      throw new NotFoundException('Artist not found after creation');
    }
    return { message: 'Artist created successfully', data: artistWithRelations, isSuccess: true };
  }

  async getArtistById(id: number): Promise<ArtistDTO> {
    const response = await this.artistRepository.findOne({
      where: { id: id },
      relations: {
        user: true,
      },
    });
    if (!response) {
      throw new NotFoundException('Artist not found');
    }
    return response;
  }

  async updateArtist(id: number, requestBody: CreateArtistRequest): Promise<ArtistResponse> {
    const { userId } = requestBody;

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const response = await this.artistRepository.update({ id: id }, { user });
    if (!response) {
      throw new NotFoundException('Failed to update artist');
    }
    return { message: 'Artist updated successfully', isSuccess: true };
  }
}

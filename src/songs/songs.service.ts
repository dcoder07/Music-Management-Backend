import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateSongRequest, SongResponse} from './dto/createSongReqRes';
import { GetAllSongsResponse, SongDTO } from './dto/getAllSongsRes';
import { AddSongToPlaylistRequest } from './dto/addSongToPlaylistReq';
import { Song } from './entities/song.entity';
import { Playlist } from '../playlists/entities/playlist.entity';
import { Artist } from '../artists/entities/artist.entity';

@Injectable()
export class SongsService {
    constructor(
        @InjectRepository(Song)
        private readonly songRepository: Repository<Song>,
        @InjectRepository(Playlist)
        private readonly playlistRepository: Repository<Playlist>,
        @InjectRepository(Artist)
        private readonly artistRepository: Repository<Artist>,
    ) { }

    async getAllSongs(): Promise<GetAllSongsResponse> {
        const response = await this.songRepository.find();
        if (!response) {
            throw new NotFoundException('Songs not found');
        }
        return { songs: response, isSuccess: true };
    }

    async createSong(requestBody: CreateSongRequest): Promise<SongResponse> {
        const { playlistIds, artistIds, ...songData } = requestBody;

        const song = this.songRepository.create(songData);

        if (playlistIds && playlistIds.length > 0) {
            const playlists = await this.playlistRepository.find({
                where: { id: In(playlistIds) },
            });
            song.playLists = playlists;
        }

        if (artistIds && artistIds.length > 0) {
            const artists = await this.artistRepository.find({
                where: { id: In(artistIds) },
            });
            song.artists = artists;
        }

        const songSavedRes = await this.songRepository.save(song);
        if (!songSavedRes) {
            throw new NotFoundException('Failed to save song to database');
        }
        return { message: 'Song created successfully', data: songSavedRes, isSuccess: true };
    }

    async getSongById(id: number): Promise<SongDTO> {
        const response = await this.songRepository.findOne({ where: { song_id: id } });
        if (!response) {
            throw new NotFoundException('Song not found');
        }
        return response;
    }

    async deleteSong(id: number): Promise<{ isSuccess: boolean }> {
        const response = await this.songRepository.delete({ song_id: id });
        if (!response) {
            throw new NotFoundException('Failed to delete song');
        }
        return { isSuccess: true };
    }

    async updateSong(id: number, requestBody: CreateSongRequest): Promise<SongResponse> {
        const response = await this.songRepository.update({ song_id: id }, requestBody);
        if (!response) {
            throw new NotFoundException('Failed to update song');
        }
        return { message: 'Song updated successfully', isSuccess: true };
    }

    async addSongToPlaylist(requestBody: AddSongToPlaylistRequest): Promise<{ message: string; isSuccess: boolean }> {
        const { songId, playlistId } = requestBody;

        const song = await this.songRepository.findOne({
            where: { song_id: songId },
            relations: {
                playLists: true,
            },
        });

        if (!song) {
            throw new NotFoundException('Song not found');
        }

        const playlist = await this.playlistRepository.findOne({
            where: { id: playlistId },
        });

        if (!playlist) {
            throw new NotFoundException('Playlist not found');
        }

        if (!song.playLists) {
            song.playLists = [];
        }

        const alreadyInPlaylist = song.playLists.some((p) => p.id === playlistId);
        if (alreadyInPlaylist) {
            throw new NotFoundException('Song already in playlist');
        }

        song.playLists.push(playlist);
        await this.songRepository.save(song);

        return { message: 'Song added to playlist successfully', isSuccess: true };
    }
}

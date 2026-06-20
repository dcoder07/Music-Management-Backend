import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Playlist } from 'src/playlists/entities/playlist.entity';
import { Artist } from 'src/artists/entities/artist.entity';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  song_id: number;

  @Column()
  title: string;

  @Column()
  duration_seconds: number;

  @Column({ type: 'date' })
  release_date: Date;

  @Column()
  language: string;

  @CreateDateColumn()
  created_at: Date;

  // Many songs can belong to many playlists
  @ManyToMany(() => Playlist, (playlist) => playlist.songs)
  @JoinTable({ name: 'songs_playlists' })
  playLists: Playlist[];

  //Each song can have muliple artists
  @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  @JoinTable({ name: 'songs_artists'})
  artists: Artist[];
}

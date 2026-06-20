import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Song } from "src/songs/entities/song.entity";
import { User } from "src/users/entities/user.entity";

@Entity('playlists')
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Each playlist can have multiple songs
  @ManyToMany(() => Song, (song) => song.playLists)
  songs: Song[];

  //Multiple playlist belongs to single user
  @ManyToOne(() => User, (user) => user.playLists)
  user: User;
  
}
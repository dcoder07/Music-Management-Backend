import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Song } from "src/songs/entities/song.entity";
import { User } from "src/users/entities/user.entity";

@Entity('playlists')
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Each playlist can have multiple songs
  @OneToMany(() => Song, (song) => song.playList)
  songs: Song[];

  //Multiple playlist belongs to single user
  @ManyToOne(() => User, (user) => user.playLists)
  user: User;
  
}
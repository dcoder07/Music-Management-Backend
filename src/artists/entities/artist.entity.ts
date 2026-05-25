import { Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Song } from 'src/songs/entities/song.entity';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  //One artist can have muliple songs
  @ManyToMany(() => Song, (song) => song.artists)
  songs: Song[];
}
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Playlist } from 'src/playlists/entities/playlist.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  // One user can have muliple playlist
  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playLists: Playlist[];

}

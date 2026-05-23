import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  song_id: number;

  @Column()
  title: string;

  @Column()
  artist: string;

  @Column()
  duration_seconds: number;

  @Column({ type: 'date' })
  release_date: Date;

  @Column()
  language: string;

  @CreateDateColumn()
  created_at: Date;
}

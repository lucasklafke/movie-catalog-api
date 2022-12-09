import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'movie' })
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false, length: 50, unique: true })
  name: string;

  @Column({ nullable: false })
  director: string;

  @Column({ nullable: false })
  genre: string;

  @Column({ name: 'release_date', nullable: false })
  releaseDate: Date;

  @Column({ name: 'image_url', nullable: true })
  imageUrl?: string | null;
}

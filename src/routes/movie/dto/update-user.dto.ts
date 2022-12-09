import { IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class UpdateMovieDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  director: string;

  @IsNotEmpty()
  @IsString()
  genre: string;

  @IsNotEmpty()
  @IsISO8601()
  releaseDate: Date;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}

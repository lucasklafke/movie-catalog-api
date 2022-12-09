import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class UpdateMovieDto {
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  director: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  genre: string;

  @IsNotEmpty()
  @IsISO8601()
  @ApiProperty()
  releaseDate: Date;

  @IsString()
  @IsOptional()
  @ApiProperty()
  imageUrl?: string;
}

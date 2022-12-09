import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateMovieDto {
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
  @ApiPropertyOptional()
  imageUrl?: string;
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-user.dto';
import { MovieEntity } from './entities/movie.entity';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const movie = await this.movieService.findOne(id);
    return movie;
  }

  @Get()
  async findMany(@Param('id') id: string) {
    const movies = await this.movieService.findMany();
    return movies;
  }

  @Post()
  async create(@Body() data: CreateMovieDto) {
    const movie = await this.movieService.create(data);
    return movie;
  }

  @Put()
  async update(@Body() data: UpdateMovieDto) {
    const movie = await this.movieService.update(data);
    return movie;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.movieService.delete(id);
  }
}

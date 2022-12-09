import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-user.dto';
import { MovieService } from './movie.service';

@Controller('movie')
@ApiTags('movies')
@UseGuards(AuthGuard('jwt'))
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

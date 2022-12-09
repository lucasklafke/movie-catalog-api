import {
  CACHE_MANAGER,
  HttpException,
  Inject,
  Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { json } from 'stream/consumers';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-user.dto';
import { MovieEntity } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly repository: Repository<MovieEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async findOne(id: string) {
    const movie = await this.repository.findOne({
      where: {
        id: id
      }
    });
    if (!movie) throw new HttpException('movie not found!', 404);
    return movie;
  }

  async create(data: CreateMovieDto) {
    const movieExist = await this.repository.findOne({
      where: { name: data.name }
    });
    if (movieExist) throw new HttpException('movie already exist!', 409);
    const movie = await this.repository.save(data);
    return movie;
  }

  async findMany() {
    const cachedMovies: MovieEntity[] = await this.cacheManager.get('movies');
    if (cachedMovies) {
      return cachedMovies;
    }
    const movies = await this.repository.find();
    await this.cacheManager.set('movies', movies, 20000);
    return movies;
  }
  async delete(id: string) {
    return await this.repository.delete({
      id
    });
  }
  async update(data: UpdateMovieDto) {
    const movieExist = await this.repository.findOne({
      where: {
        name: data.name
      }
    });
    if (movieExist)
      throw new HttpException('the name of the movie already exist!', 409);
    const movie = await this.repository.findOne({
      where: {
        id: data.id
      }
    });
    movie.director = data.director;
    movie.genre = data.genre;
    movie.imageUrl = data.imageUrl;
    movie.name = data.name;

    if (!movie) throw new HttpException('movie not found', 404);

    return await this.repository.save(movie);
  }
}

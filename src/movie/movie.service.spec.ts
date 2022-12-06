import { HttpException, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-user.dto';
import { MovieEntity } from './entities/movie.entity';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
  let repository: Repository<MovieEntity>;
  const fakeMovies = [
    {
      id: '1',
      director: 'lucas',
      genre: 'action',
      name: 'the famous case of lucas with nest.js',
      releaseDate: new Date('2022-02-02'),
    },
  ];
  const mockRepository = {
    findOne: jest.fn().mockResolvedValue(fakeMovies[0]),
    save: jest.fn().mockResolvedValue(fakeMovies[0]),
    find: jest.fn().mockResolvedValue(fakeMovies),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getRepositoryToken(MovieEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
    repository = module.get<Repository<MovieEntity>>(
      getRepositoryToken(MovieEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create endpoint', () => {
    it('should create a new movie entity', async () => {
      jest.spyOn(repository, 'findOne').mockImplementationOnce((): any => {
        return undefined;
      });
      const data: CreateMovieDto = {
        director: 'lucas',
        genre: 'action',
        name: 'the famous case of lucas with nest.js',
        releaseDate: new Date('2022-02-02'),
      };
      const result = await service.create(data);

      expect(result).toBeDefined();
      expect(result).toEqual(fakeMovies[0]);
    });

    it('should return an conflict error when create a new movie entity', async () => {
      const data: CreateMovieDto = {
        director: 'lucas',
        genre: 'action',
        name: 'the famous case of lucas with nest.js',
        releaseDate: new Date('2022-02-02'),
      };
      try {
        const result = await service.create(data);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error).toEqual(new HttpException('movie already exist!', 409));
      }
    });
  });

  describe('findOne endpoint', () => {
    it('should return one movie', async () => {
      const result = await service.findOne('1');
      expect(result).toBeDefined();
      expect(result).toEqual(fakeMovies[0]);
    });
    it('should return not found error', async () => {
      jest.spyOn(repository, 'findOne').mockImplementationOnce((): any => {
        return undefined;
      });
      try {
        const result = await service.findOne('1');
        expect(result).toBeUndefined();
      } catch (error) {
        expect(error).toBeDefined();
        expect(error).toEqual(new HttpException('movie not found!', 404));
      }
    });
  });

  describe('fineMany endpoint', () => {
    it('should return many movies', async () => {
      const result = await service.findMany();
      expect(result.length).toBeGreaterThan(0);
      expect(result).toBeDefined();
      expect(result).toEqual(fakeMovies);
    });

    it('should return an empty array', async () => {
      jest.spyOn(repository, 'find').mockImplementationOnce((): any => {
        return undefined;
      });
      const result = await service.findMany();
      expect(result).toBeUndefined();
    });
  });

  describe('delete endpoint', () => {
    it('should delete a movie', async () => {
      const result = await service.delete('1');
      expect(result).toBeUndefined();
    });
  });

  describe('update endpoint', () => {
    it('should update a movie', async () => {
      jest.spyOn(repository, 'findOne').mockImplementationOnce((): any => {
        return undefined;
      });
      const data: UpdateMovieDto = fakeMovies[0];

      const result = await service.update(data);

      expect(result).toEqual(fakeMovies[0]);
    });

    it('should return a conflict error', async () => {
      jest.spyOn(repository, 'findOne').mockImplementationOnce((): any => {
        return fakeMovies[0];
      });

      const data: UpdateMovieDto = fakeMovies[0];

      try {
        const result = await service.update(data);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error).toEqual(
          new HttpException('the name of the movie already exist!', 404),
        );
      }
    });
  });
});

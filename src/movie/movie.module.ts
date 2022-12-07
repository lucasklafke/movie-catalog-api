import { CacheModule, Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieEntity]),
    CacheModule.register({
      Store: redisStore,
      host: 'localhost', //default host
      port: 6379,
    }),
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}

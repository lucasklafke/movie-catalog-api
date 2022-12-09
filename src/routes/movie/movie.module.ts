import { CacheModule, Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import * as redisStore from 'cache-manager-redis-store';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieEntity]),
    CacheModule.register({
      Store: redisStore,
      host: 'localhost', //default host
      port: 6379
    })
  ],
  controllers: [MovieController],
  providers: [MovieService]
})
export class MovieModule {}

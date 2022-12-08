import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import 'reflect-metadata';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { dataSourceOptions } from 'db/data-source';
@Module({
  imports: [
    MovieModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions)
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

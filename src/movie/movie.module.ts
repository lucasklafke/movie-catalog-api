import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { DatabaseModule } from 'src/database/database.module';
import { movieProviders } from './movie.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [MovieController],
  providers: [MovieService, ...movieProviders],
})
export class MovieModule {}

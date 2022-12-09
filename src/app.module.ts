import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './routes/movie/movie.module';
import 'reflect-metadata';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { AuthModule } from './routes/auth/auth.module';
import { UsersModule } from './routes/users/users.module';
@Module({
  imports: [
    MovieModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

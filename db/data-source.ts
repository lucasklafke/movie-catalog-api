import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  database: 'postgres',
  host: 'db_postgres_movie_api',
  port: 5432,
  password: 'postgres',
  username: 'postgres',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*.js']
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

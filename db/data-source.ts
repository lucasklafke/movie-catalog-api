import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  database: 'postgres',
  host: 'localhost',
  port: 49153,
  password: 'postgrespw',
  username: 'postgres',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*.js']
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

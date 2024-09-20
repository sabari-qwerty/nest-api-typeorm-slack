import { Data } from 'src/entities/data.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
require('dotenv').config();

export const pgConfig: PostgresConnectionOptions = {
  url: process.env.DATABASEURL ?? '',
  type: 'postgres',
  port: 3306,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

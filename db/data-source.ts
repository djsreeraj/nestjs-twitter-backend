import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: '.env' });

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: `${process.env.POSTGRES_HOST}`,
    port: parseInt(`${process.env.POSTGRES_PORT}`, 10), 
    username: `${process.env.POSTGRES_USER}`, 
    password: `${process.env.POSTGRES_PASSWORD}`, 
    database: `${process.env.POSTGRES_DB}`,
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/db/migrations/*{.ts,.js}"],
    synchronize: true,
}


const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

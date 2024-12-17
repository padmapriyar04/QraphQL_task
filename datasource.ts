import { DataSource } from "typeorm";
import "dotenv/config";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["src/entity/*.*"],
    synchronize: true,
    logging: false,
})
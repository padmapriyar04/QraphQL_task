import { DataSource } from "typeorm";
import "dotenv/config";
import { Book } from "./src/entity/Books.js";
import { User } from "./src/entity/User.js";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Book,User],
    synchronize: true,
    logging: false,
})
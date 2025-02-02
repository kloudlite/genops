import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/user";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT||"5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  entities: [User],
  logging: false,
});

await AppDataSource.initialize();

export const UserRepo = AppDataSource.getRepository(User);
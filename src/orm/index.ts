import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/user";
import { Agent } from "./entities/agents";
import { Operator } from "./entities/operators";
import { ChatSession } from "./entities/sessions";
import { Message } from "./entities/messages";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  entities: [User, Operator, Agent, ChatSession, Message],
  logging: false,
});

await AppDataSource.initialize();

export const UserRepo = AppDataSource.getRepository(User);
export const OperatorsRepo = AppDataSource.getRepository(Operator);
export const AgentsRepo = AppDataSource.getRepository(Agent);
export const SessionsRepo = AppDataSource.getRepository(ChatSession);
export const MessagesRepo = AppDataSource.getRepository(Message);

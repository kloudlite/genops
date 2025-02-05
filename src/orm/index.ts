import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/user";
import { Agent } from "./entities/agents";
import { Operator } from "./entities/operators";
import { ChatSession } from "./entities/sessions";
import { Message } from "./entities/messages";
import { Project } from "./entities/project";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  entities: [User, Operator, Agent, ChatSession, Message, Project],
  logging: false,
});

let initialized = false;

export async function getDataSource() {
  if (!initialized) {
    await AppDataSource.initialize();
    initialized = true;
  }
  return AppDataSource;
}

export async function getUserRepo() {
  const dataSource = await getDataSource();
  return dataSource.getRepository(User);
}

export async function getOperatorsRepo() {
  const dataSource = await getDataSource();
  return dataSource.getRepository(Operator);
}

export async function getAgentsRepo() {
  const dataSource = await getDataSource();
  return dataSource.getRepository(Agent);
}

export async function getChatSessionsRepo() {
  const dataSource = await getDataSource();
  return dataSource.getRepository(ChatSession);
}

export async function getMessagesRepo() {
  const dataSource = await getDataSource();
  return dataSource.getRepository(Message);
}

export async function getProjectsRepo() {
  const dataSource = await getDataSource();
  return dataSource.getRepository(Project);
}

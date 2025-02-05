/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ChatSession } from "./sessions";

@Entity({name: "operators"})
export class Operator extends BaseEntity {
  @PrimaryGeneratedColumn("uuid", {name: "id"})
  id: string;

  @Index()
  @Column({name: "name"})
  name: string;

  @Column({name: "base_agent"})
  baseAgent: string;

  @Column("text", {name: "instruction"})
  instruction: string;

  @Index()
  @Column({name: "user"})
  user: string;

  @Column({ type: "jsonb", name: "tools" })
  tools: Array<{
    name: string;
    params?: Record<string, any>;
  }>;

  @OneToMany(() => ChatSession, (chatSession) => chatSession.operator)
  chatSessions: ChatSession[];

  @Index()
  @Column({name: "created_at"})
  @CreateDateColumn({name: "created_at"})
  createdAt: Date;
}

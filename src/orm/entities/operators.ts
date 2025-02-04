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

@Entity()
export class Operator extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index()
  @Column()
  name: string;

  @Column()
  baseAgent: string;

  @Column("text")
  instruction: string;

  @Index()
  @Column()
  user: string;

  @Column({ type: "jsonb" })
  tools: Array<{
    name: string;
    params?: Record<string, any>;
  }>;

  @OneToMany(() => ChatSession, (chatSession) => chatSession.operator)
  chatSessions: ChatSession[];

  @Index()
  @CreateDateColumn({name: "created_at"})
  createdAt: Date;
}

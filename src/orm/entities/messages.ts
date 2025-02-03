/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ChatSession } from "./sessions";

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ChatSession, (session) => session.messages, {cascade: true})
  session: Awaited<ChatSession>;

  @Column()
  sender: "user" | "model";

  @Column()
  text: string;

  @CreateDateColumn()
  timestamp: string;
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseEntity, Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./messages";

@Entity()
export class ChatSession extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: "" })
  name?: string;

  @Index()
  @Column()
  user: string;

  @OneToMany(() => Message, (message) => message.sessionId)
  messages: Array<Message>;

  @Index()
  @Column()
  operator: string;

  @CreateDateColumn()
  createdAt: Date;
}

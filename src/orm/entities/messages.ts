import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";
import { ChatSession } from "./sessions";

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => ChatSession, (session) => session.messages, { onDelete: "CASCADE" })
  @JoinColumn({ name: "sessionId" })
  session: ChatSession;

  @Column()
  sender: "user" | "model";

  @Column()
  text: string;

  @CreateDateColumn()
  timestamp: Date;
}

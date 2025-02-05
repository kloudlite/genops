import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ChatSession } from "./sessions";

@Entity({ name: "messages" })
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string;

  @ManyToOne(() => ChatSession, (session) => session.messages, { onDelete: "CASCADE" })
  @JoinColumn({
    name: "session_id",
  })
  session: Awaited<ChatSession>;

  @Column({ name: "sender" })
  sender: "user" | "assistant";

  @Column({ name: "text" })
  text: string;

  @CreateDateColumn({ name: "timestamp" })
  timestamp: Date;
}

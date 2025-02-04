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

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => ChatSession, (session) => session.messages, { onDelete: "CASCADE" })
  @JoinColumn({
    name: "session_id",
  })
  session: Awaited<ChatSession>;

  @Column()
  sender: "user" | "assistant";

  @Column()
  text: string;

  @CreateDateColumn()
  timestamp: Date;
}

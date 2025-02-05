import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Message } from "./messages";
import { Operator } from "./operators";

@Entity({name: "sessions"})
export class ChatSession extends BaseEntity {
  @PrimaryGeneratedColumn("uuid", {name: "id"})
  id: string;

  @Column({ default: "" })
  name?: string;

  @Index()
  @Column({name: "user"})
  user: string;

  @OneToMany(() => Message, (message) => message.session)
  messages: Message[];

  @ManyToOne(() => Operator, (operator) => operator.chatSessions, { onDelete: "CASCADE" })
  @JoinColumn({name: "operator"})
  operator: Awaited<Operator>;

  @Column({default: false, name: "locked"})
  locked: boolean;
  
  @CreateDateColumn({name: "created_at"})
  createdAt: Date;
}

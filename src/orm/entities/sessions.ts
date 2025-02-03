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

@Entity()
export class ChatSession extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: "" })
  name?: string;

  @Index()
  @Column()
  user: string;

  @OneToMany(() => Message, (message) => message.session)
  messages: Message[];

  @ManyToOne(() => Operator, (operator) => operator.chatSessions, { onDelete: "CASCADE" })
  @JoinColumn()
  operator: Awaited<Operator>;

  @CreateDateColumn()
  createdAt: Date;
}

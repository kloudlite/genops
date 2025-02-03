/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sessionId: string;

  @Column()
  sender: "user" | "model";

  @Column()
  text: string;

  @CreateDateColumn()
  timestamp: string;
}
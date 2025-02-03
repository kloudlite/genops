/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Operator extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
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

  @Index()
  @CreateDateColumn()
  createdAt: Date;
}

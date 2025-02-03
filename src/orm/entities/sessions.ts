/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  user: string;

  @Index()
  @Column()
  model: string;

  @Column({ type: "timestamptz", default: () => "now()" })
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}

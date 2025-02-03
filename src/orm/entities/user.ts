import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Index()
  @Column()
  username: string;

  @Column()
  password: string;

  @Index()
  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: Date;
}
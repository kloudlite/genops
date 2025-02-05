import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "users"})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {name: "id"})
  id: string;

  @Column({name: "name"})
  name: string;

  @Index()
  @Column({name: "username"})
  username: string;

  @Column({name: "password"})
  password: string;

  @Index()
  @Column({name: "email"})
  email: string;

  @CreateDateColumn({name: "created_at"})
  createdAt: Date;
}
import { BaseEntity, Column, CreateDateColumn, Entity, Index } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @Column({ primary: true, generated: true })
  id: number;

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
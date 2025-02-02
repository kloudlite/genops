import { BaseEntity, Column, CreateDateColumn, Entity } from "typeorm";


@Entity()
export class User extends BaseEntity{
  @Column({ primary: true, generated: true })
  id: number;
  @Column()
  name: string;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  email: string;
  @CreateDateColumn()
  createdAt: Date;
}
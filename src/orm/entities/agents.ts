import { BaseEntity, Column, CreateDateColumn, Entity, Index, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project";

@Entity()
export class Agent extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Index()
  @Column()
  developer: string;

  @Column()
  desc: string;
  
  @Index()
  @Column({name: "model_provider"})
  modelProvider: string;

  @Index()
  @Column()
  model: string;

  @Column({ type: "jsonb" })
  tools: Array<{
    name: string;
    desc: string;
    source: string;
    params?: Array<{
      name: string;
      type: string;
      required: boolean;
      defaultValue: string;
    }>;
  }>;
  

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => Project, project => project.agents)
  projects: Project[];
}
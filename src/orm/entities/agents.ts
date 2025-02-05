import { BaseEntity, Column, CreateDateColumn, Entity, Index, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project";

@Entity({name: "agents"})
export class Agent extends BaseEntity {
  @PrimaryGeneratedColumn("uuid",{name: "id"})
  id: string;

  @Column({name: "name"})
  name: string;

  @Index()
  @Column({name: "developer"})
  developer: string;

  @Column({name: "desc"})
  desc: string;
  
  @Index()
  @Column({name: "model_provider"})
  modelProvider: string;

  @Index()
  @Column({name: "model"})
  model: string;

  @Column({ type: "jsonb", name: "tools" })
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
  

  @CreateDateColumn({name: "created_at"})
  createdAt: Date;

  @ManyToMany(() => Project, project => project.agents)
  projects: Project[];
}
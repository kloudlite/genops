import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BeforeUpdate, BaseEntity } from "typeorm";
import { Agent } from "./agents";

@Entity({name: "projects"})
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn("uuid", {name: "id"})
  id: number;

  @Column({name: "repo"})
  repo: string;

  @Column({name: "org"})
  org: string;

  @Column({name: "branch"})
  branch: string;

  @Column({name: "created_at"})
  createdAt: Date;
  
  @Column({name: "updated_at"})
  updatedAt: Date;

  @ManyToMany(() => Agent, { cascade: true, onDelete: "CASCADE" })
  @JoinTable()
  agents: Agent[];

  @BeforeUpdate()
  async removeDeletedAgents() {
    this.agents = this.agents.filter(agent => agent !== null);
  }

//   @Column({type: "jsonb"})
//   agents: Array<{
//     name: string;
//     instructions: string;
//     model: string;
//     modelProvider: string;
//     tools: Array<{
//       name: string;
//       desc: string;
//       source: string;
//       params?: Array<{
//         name: string;
//         type: string;
//         required: boolean;
//         defaultValue: string;
//       }>;
//     }>;
//   }>;

}
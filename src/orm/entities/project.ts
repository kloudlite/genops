import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BeforeUpdate, BaseEntity } from "typeorm";
import { Agent } from "./agents";

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  repo: string;

  @Column()
  org: string;

  @Column()
  branch: string;

  @Column()
  createdAt: Date;
  
  @Column()
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
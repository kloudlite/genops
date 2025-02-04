import { ProjectsRepo } from "@/orm";
import { Project } from "@/orm/entities/project";
import { DeepPartial } from "typeorm";
import { checkAuth } from "./auth";

export const createProject = async (projectURL: string) => {
  const authResult = await checkAuth();
  if (!authResult.data) {
    return {
      error: "AuthenticationFailed",
    };
  }
  const { username } = authResult.data;
  

  const projectData: DeepPartial<Project> = {
    // provide data here
  };
  const project = ProjectsRepo.create(projectData);
  await ProjectsRepo.save(project);
  return { data: project };
};
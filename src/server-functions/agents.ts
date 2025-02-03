"use server";

import { AgentsRepo } from "@/orm";
import { DeepPartial } from "typeorm";
import { checkAuth } from "./auth";
import { Agent } from "@/orm/entities/agents";

export const createAnAgent = async (agentData: DeepPartial<Agent>) => {
  const authResult = await checkAuth();
  if (!authResult.data) {
    return {
      error: "AuthenticationFailed",
    };
  }
  const { username } = authResult.data;
  const agent = AgentsRepo.create(agentData);
  agent.developer = username;
  await AgentsRepo.save(agent);
};

export const getDeveloperAgents = async () => {
  const authResult = await checkAuth();
  if (!authResult.data) {
    return {
      error: "AuthenticationFailed",
    };
  }
  const { username } = authResult.data;
  const operators = await AgentsRepo.find({ where: { developer: username } });
  return {
    data: operators,
  };
};

export const deleteAgent = async (agentId: string) => {
  const authResult = await checkAuth();
  if (!authResult.data) {
    return {
      error: "AuthenticationFailed",
    };
  }
  const { username } = authResult.data;
  const operator = await AgentsRepo.findOne({ where: { id: agentId } });
  if (!operator) {
    return {
      error: "AgentNotFound",
    };
  }
  if (operator.developer !== username) {
    return {
      error: "Unauthorized",
    };
  }
  await AgentsRepo.remove(operator);
  return {
    data: "AgentDeleted",
  };
};

"use server";

import { AgentsRepo } from "@/orm";
import { DeepPartial } from "typeorm";
import { checkAuth } from "./auth";
import { Agent } from "@/orm/entities/agents";

export const getAgent = async (agentId: string) => {
  const authResult = await checkAuth();
  if (!authResult.data) {
    return {
      error: "AuthenticationFailed",
    };
  }
  const agent = await AgentsRepo.findOne({ where: { id: agentId } });
  if (!agent) {
    return {
      error: "AgentNotFound",
    };
  }
  return {
    data: agent,
  };
}

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
  const agents = await AgentsRepo.find({ where: { developer: username } });
  return {
    data: agents,
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
  const agent = await AgentsRepo.findOne({ where: { id: agentId } });
  if (!agent) {
    return {
      error: "AgentNotFound",
    };
  }
  if (agent.developer !== username) {
    return {
      error: "Unauthorized",
    };
  }
  await AgentsRepo.remove(agent);
  return {
    data: "AgentDeleted",
  };
};

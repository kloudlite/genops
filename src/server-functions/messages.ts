"use server";

import { MessagesRepo, ChatSessionsRepo, AgentsRepo } from "@/orm";
import { checkAuth } from "./auth";
import fetchStream from "@/lib/stream-reader";

export const sendMessage = async (sessionId: string,text: string) => {
  const authResult = await checkAuth();
  if (!authResult.data) {
    return {
      error: "AuthenticationFailed",
    };
  }
  const chatSession = await ChatSessionsRepo.findOne({ where: { id: sessionId } });
  if (chatSession == null) {
    return {
      error: "Invalid session",
    };
  }
  if (chatSession.locked) {
    return {
      error: "SessionLocked",
    }
  }
  chatSession.locked = true;
  await ChatSessionsRepo.save(chatSession);

  const agent = await AgentsRepo.findOne({ where: { id: chatSession.operator.baseAgent } });
  if (!agent) {
    return {
      error: "AgentNotFound",
    }
  }

  const messages = await MessagesRepo.find({
    where: { session: { id: sessionId } },
    order: { timestamp: "DESC" },
    take: 20,
  });
  
  let oldMessages = messages.map((message) => ({
    content: message.text,
    role: message.sender === "user" ? "user" : "assistant",
  }));
    
  oldMessages.push({
    content: text,
    role: "user",
  });
  
  const response = await fetchStream(oldMessages, agent);

  let message = MessagesRepo.create({
    session: chatSession,
    sender: "user",
    text: text,
  });
  await MessagesRepo.save(message);

  message = MessagesRepo.create({
    session: chatSession,
    sender: "assistant",
    text: response,
  });
  await MessagesRepo.save(message);

  chatSession.locked = false;
  await ChatSessionsRepo.save(chatSession);

  return {
    data: true
  }
};

export const getSessionMessages = async (
  sessionId: string,
  offset: number = 0,
  limit: number = 100,
) => {
  const authResult = await checkAuth();
  if (!authResult.data) {
    return {
      error: "AuthenticationFailed",
    };
  }
  if (sessionId == null) {
    return {
      error: "Invalid session",
    };
  }
  const session = await ChatSessionsRepo.findOne({ where: { id: sessionId } });
  if (session == null) {
    return {
      error: "Invalid session",
    };
  }
  const messages = await MessagesRepo.find({
    where: { session: { id: sessionId } },
    order: { timestamp: "DESC" },
    take: limit,
    skip: offset * limit,
  });
  return {
    data: messages,
  };
};

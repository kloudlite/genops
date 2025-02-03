"use server";

import { MessagesRepo, ChatSessionsRepo } from "@/orm";
import { checkAuth } from "./auth";

export const sendMessage = async (text: string, sessionId: string) => {
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
  const message = MessagesRepo.create({
    session: chatSession,
    sender: "user",
    text: text,
  });
  await MessagesRepo.save(message);
};

export const getSessionMessages = async (
  sessionId: string,
  offset: number,
  limit: number
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

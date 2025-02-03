"use server";

import { MessagesRepo, SessionsRepo } from "@/orm";
import { checkAuth } from "./auth";

export const createChatSession = async (
  operatorId: string,
  fistMessage: string
) => {
  const authResult = await checkAuth();
  if (!authResult.data) {
    return {
      error: "AuthenticationFailed",
    };
  }
  const { username } = authResult.data;
  const chatSession = SessionsRepo.create({
    operator: { id: operatorId },
  });
  chatSession.user = username;
  await SessionsRepo.save(chatSession);
  const message = MessagesRepo.create({
    session: chatSession,
    sender: "user",
    text: fistMessage,
  });
  await MessagesRepo.save(message);
  return { data: JSON.parse(JSON.stringify(chatSession)) };
};

export const listUserSessionsForOperator = async (operatorId: string) => {
  const authResult = await checkAuth();
  if (!authResult.data) {
    return {
      error: "AuthenticationFailed",
    };
  }
  const { username } = authResult.data;
  const sessions = await SessionsRepo.find({
    relations: ["operator"],
    where: {
      user: username,
      operator: {
        id: operatorId,
      },
    },
    loadRelationIds: true,
  });
  return { data: sessions };
};

export const deleteChatSession = async (sessionId: string) => {
  const authResult = await checkAuth();
  if (!authResult.data) {
    return { error: "AuthenticationFailed" };
  }
  const { username } = authResult.data;
  const chatSession = await SessionsRepo.findOne({ where: { id: sessionId } });
  if (!chatSession) {
    return { error: "SessionNotFound" };
  }
  if (chatSession.user !== username) {
    return { error: "Unauthorized" };
  }
  await SessionsRepo.remove(chatSession);
  return { data: "SessionDeleted" };
};

"use server";

import { getMessagesRepo, getChatSessionsRepo, getOperatorsRepo } from "@/orm";
import { checkAuth } from "./auth";
import nc from "@/messaging";

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
  const ChatSessionsRepo = await getChatSessionsRepo();
  const MessagesRepo = await getMessagesRepo();
  const chatSession = ChatSessionsRepo.create({
    operator: { id: operatorId },
  });
  chatSession.user = username;
  await ChatSessionsRepo.save(chatSession);
  const message = MessagesRepo.create({
    session: chatSession,
    sender: "user",
    text: fistMessage,
  });
  await MessagesRepo.save(message);
  nc.publish(`chat.${chatSession.id}`, JSON.stringify(message));
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
  const OperatorsRepo = await getOperatorsRepo();
  const ChatSessionsRepo = await getChatSessionsRepo();
  const operator = await OperatorsRepo.findOne({
    where: { id: operatorId },
  });
  const sessions = await ChatSessionsRepo.find({
    relations: ["operator"],
    where: {
      user: username,
      operator: {
        id: operatorId,
      },
    },
    loadRelationIds: true,
  });
  return { data: sessions, operatorName: operator?.name };
};

export const deleteChatSession = async (sessionId: string) => {
  const authResult = await checkAuth();
  if (!authResult.data) {
    return { error: "AuthenticationFailed" };
  }
  const { username } = authResult.data;
  const ChatSessionsRepo = await getChatSessionsRepo();
  const chatSession = await ChatSessionsRepo.findOne({
    where: { id: sessionId },
  });
  if (!chatSession) {
    return { error: "SessionNotFound" };
  }
  if (chatSession.user !== username) {
    return { error: "Unauthorized" };
  }
  await ChatSessionsRepo.remove(chatSession);
  return { data: "SessionDeleted" };
};

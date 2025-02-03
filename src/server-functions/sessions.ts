"use server";

import { MessagesRepo, SessionsRepo } from "@/orm";
import { DeepPartial } from "typeorm";
import { checkAuth } from "./auth";
import { Session } from "@/orm/entities/sessions";

export const createChatSession = async (sessionData: DeepPartial<Session>, fistMessage: string) => {
  const authResult = await checkAuth();
  if (!authResult.data) {
    return {
      error: "AuthenticationFailed",
    };
  }
  const { username } = authResult.data;
  const chatSession = SessionsRepo.create(sessionData);
  chatSession.user = username;
  await SessionsRepo.save(chatSession);
  const message = MessagesRepo.create({ sessionId: chatSession.id, sender: "user", text: fistMessage }); 
  await MessagesRepo.save(message);
  return { data: chatSession };
};

export const listUserSessionsForOperator = async () => {
    const authResult = await checkAuth();
    if (!authResult.data) {
      return {
        error: "AuthenticationFailed",
      };
    }
    const { username } = authResult.data;
    const sessions = await SessionsRepo.find({ where: { user: username } });
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

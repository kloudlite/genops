"use server";

import { MessagesRepo, SessionsRepo } from "@/orm";
import { DeepPartial } from "typeorm";
import { checkAuth } from "./auth";
import { Message } from "@/orm/entities/messages";

export const sendMessage = async (messageData: DeepPartial<Message>) => {
  const authResult = await checkAuth();
  if (!authResult.data) {
    return {
      error: "AuthenticationFailed",
    };
  }
  if (messageData.sessionId == null) {
    return {
      error: "Invalid session"
    }
  }
  const session = await SessionsRepo.findOne({where: {id: messageData.sessionId}})
  if (session == null) {
    return {
        error: "Invalid session"
    }
  }
  const message = MessagesRepo.create(messageData);
  await MessagesRepo.save(message);
};

export const getSessionMessages = async (sessionId: string, offset: number, limit: number) => {
  const authResult = await checkAuth();
  if (!authResult.data) {
    return {
      error: "AuthenticationFailed",
    };
  }
  if (sessionId == null) {
    return {
      error: "Invalid session"
    }
  }
  const session = await SessionsRepo.findOne({where: {id: sessionId}})
  if (session == null) {
    return {
        error: "Invalid session"
    }
  }
  const messages = await MessagesRepo.find({ where: { sessionId: sessionId }, order: { timestamp: "DESC" }, take: limit, skip: offset*limit });
  return {
    data: messages
  };
};

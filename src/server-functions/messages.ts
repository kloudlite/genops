"use server";

import { MessagesRepo, ChatSessionsRepo, OperatorsRepo } from "@/orm";
import { checkAuth } from "./auth";
import fetchStream from "@/lib/stream-reader";

export const sendMessage = async (sessionId: string, text: string) => {
  const authResult = await checkAuth();
  if (!authResult.data) {
    return {
      error: "AuthenticationFailed",
    };
  }
  const chatSession = await ChatSessionsRepo.findOne({
    where: { id: sessionId },
    relations: ["operator"],
  });
  if (chatSession == null) {
    return {
      error: "Invalid session",
    };
  }
  if (chatSession.locked) {
    return {
      error: "SessionLocked",
    };
  }
  chatSession.locked = true;
  await ChatSessionsRepo.save(chatSession);
  console.log("chatSession", chatSession);
  const operator = await OperatorsRepo.findOne({
    where: { id: chatSession.operator.id },
  });
  if (!operator) {
    return {
      error: "OperatorNotFound",
    };
  }

  const messages = await MessagesRepo.find({
    where: { session: { id: sessionId } },
    order: { timestamp: "DESC" },
    take: 20,
  });

  const oldMessages = messages.map((message) => ({
    content: message.text,
    role: message.sender === "user" ? "user" : "assistant",
  }));

  if (text) {
    console.log("text calling push", text);
    oldMessages.push({
      content: text,
      role: "user",
    });

    const userMessage = MessagesRepo.create({
      session: chatSession,
      sender: "user",
      text: text,
    });
    await MessagesRepo.save(userMessage);
  }
  const readableStream = new ReadableStream<{
    data?: string | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    func?: { name: string; args: any };
  }>({
    async start(controller) {
      await fetchStream(
        oldMessages,
        operator,
        async (chunk, done) => {
          if (done) {
            const message = MessagesRepo.create({
              session: chatSession,
              sender: "assistant",
              text: chunk as string,
            });
            await MessagesRepo.save(message);
            chatSession.locked = false;
            await ChatSessionsRepo.save(chatSession);
            controller.close();
            return;
          }
          controller.enqueue({ data: chunk });
        },
        async (title)=>{
          chatSession.name = title;
          await ChatSessionsRepo.save(chatSession);
        }
      );
    },
  });

  return readableStream;
};

export const getSessionMessages = async (
  sessionId: string,
  offset: number = 0,
  limit: number = 100
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
    data: JSON.parse(JSON.stringify(messages)),
    sessionIsLocked: session.locked,
  };
};

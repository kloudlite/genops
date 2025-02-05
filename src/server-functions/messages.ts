"use server";

import { getMessagesRepo, getChatSessionsRepo, getOperatorsRepo } from "@/orm";
import { checkAuth } from "./auth";
import fetchStream from "@/lib/stream-reader";
import nc from "@/messaging";

export const listenToChatSession = async (sessionId: string) => {
  const readableStream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const subscription = await nc.subscribe(`chat.${sessionId}`);
      for await (const message of subscription) {
        controller.enqueue(message.data);
      }
      controller.close();
    },
  });
  return readableStream;
}

export const sendMessage = async (sessionId: string, text: string) => {
  const authResult = await checkAuth();
  if (!authResult.data) {
    return {
      error: "AuthenticationFailed",
    };
  }
  const ChatSessionsRepo = await getChatSessionsRepo();
  const OperatorsRepo = await getOperatorsRepo();
  const MessagesRepo = await getMessagesRepo();

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
    nc.publish(`chat.${sessionId}`, JSON.stringify(userMessage));
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
  const ChatSessionsRepo = await getChatSessionsRepo();
  const MessagesRepo = await getMessagesRepo();
  
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

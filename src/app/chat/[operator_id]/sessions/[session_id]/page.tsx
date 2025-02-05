// "use client";
import { getSessionMessages } from "@/server-functions/messages";
import { Chat } from "./client-side-components";

const Page = async ({
  params,
}: {
  params: Promise<{ session_id: string }>;
}) => {
  const p = await params;
  const { session_id } = p;
  console.log("session_id", session_id);
  const resp = await getSessionMessages(session_id);
  console.log("resp", resp);
  if (resp.error) {
    return "";
  }
  const messages = resp.data;
  const startStream = !resp.sessionIsLocked && messages?.[0].sender == "user";

  return (
    <Chat
      session_id={session_id}
      startStream={startStream}
      messages={
        messages as {
          id: string;
          text: string;
          sender: string;
        }[]
      }
    />
  );
};

export default Page;

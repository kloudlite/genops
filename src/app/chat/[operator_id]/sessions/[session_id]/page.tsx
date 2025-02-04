import { getSessionMessages } from "@/server-functions/messages";
import { SendMessage } from "./client-side-components";

const Page = async ({
  params,
}: {
  params: Promise<{ session_id: string }>;
}) => {
  const p = await params;
  const { session_id } = p;
  const resp = await getSessionMessages(session_id);
  if (resp.error) {
    return "";
  }
  const messages = resp.data;
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4 flex flex-col-reverse items-end gap-2">
        {messages?.map((msg) => {
          return <div key={msg.id} className="bg-slate-100 p-4 px-6">{msg.text}</div>;
        })}
      </div>
      <SendMessage session_id={session_id} />
    </div>
  );
};

export default Page;

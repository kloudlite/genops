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
    <div className="flex flex-col h-screen relative">
      <div className="flex-1 overflow-y-auto p-4 flex flex-col">
        <div className="max-w-full w-3/4 mx-auto flex flex-col-reverse items-end gap-2">
          <div className="h-[100px]"></div>
          {messages?.map((msg) => {
            return (
              <div
                key={msg.id}
                className="bg-slate-100 p-3 px-6 rounded-lg max-w-sm flex-wrap text-right"
              >
                {msg.text}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-center pb-6 absolute bottom-0 w-full">
        <SendMessage session_id={session_id} />
      </div>
    </div>
  );
};

export default Page;

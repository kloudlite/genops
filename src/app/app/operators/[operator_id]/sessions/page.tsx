import { Button } from "@/components/ui/button";
import { listUserSessionsForOperator } from "@/server-functions/sessions";
import { MessageSquareIcon } from "lucide-react";

export default async function Page(params: Promise<{ operator_id: string }>) {
  const { operator_id } = await params;
  const resp = await listUserSessionsForOperator(operator_id);
  if (resp.error) {
    return <div>{resp.error}</div>;
  }
  const sessions = resp.data || [];
  return (
    <div className="min-h-screen grid grid-cols-6">
      <div className="border-r">
        <div className="flex justify-between items-center border-b  p-4">
          <h1 className="text-lg font-bold items-center sticky top-0">Chats</h1>
          <Button variant={"ghost"}>
            <MessageSquareIcon />
          </Button>
        </div>
        <div>
          {
            sessions.map((session) => {
              return (
                <div key={session.id} className="p-4 border-b">
                  <div>{session.id}</div>
                </div>
              );
            })
          }
        </div>
      </div>
      <div>Chat</div>
    </div>
  );
}

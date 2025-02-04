import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { listUserSessionsForOperator } from "@/server-functions/sessions";
import { EllipsisVertical, MessageSquareIcon } from "lucide-react";
import Link from "next/link";
import { DeleteChatSessionButton } from "./client-side-components";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ operator_id: string }>;
  children: React.ReactNode;
}) {
  const { operator_id } = await params;
  const resp = await listUserSessionsForOperator(operator_id);
  if (resp.error) {
    return <div>{resp.error}</div>;
  }
  const sessions = resp.data || [];
  return (
    <>
      <div className="h-screen grid grid-cols-6">
        <div className="border-r">
          <div className="flex justify-between items-center border-b  p-4">
            <h1 className="text-lg font-bold items-center sticky top-0">
              Chats
            </h1>
            <Link href={`/chat/${operator_id}/sessions`}>
              <Button variant={"ghost"}>
                <MessageSquareIcon />
              </Button>
            </Link>
          </div>
          <div>
            {sessions.map((session) => {
              return (
                <Link
                  key={session.id}
                  href={`/chat/${operator_id}/sessions/${session.id}`}
                >
                  <div className="p-4 border-b flex justify-between items-center group">
                    <div>{session.name || "New Chat"}</div>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        className="opacity-5 group-hover:opacity-100 transition-all"
                      >
                        <EllipsisVertical size={18} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="bottom" align="end">
                        <DeleteChatSessionButton id={session.id} />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="col-span-5">{children}</div>
      </div>
    </>
  );
}

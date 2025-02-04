import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { listUserSessionsForOperator } from "@/server-functions/sessions";
import { ArrowLeft, EllipsisVertical, MessageCircle } from "lucide-react";
import Link from "next/link";
import { DeleteChatSessionButton } from "./client-side-components";
import cn from "classnames";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ operator_id: string, session_id?: string }>;
  children: React.ReactNode;
}) {
  const { operator_id, session_id } = await params;
  console.log(session_id, operator_id);
  const resp = await listUserSessionsForOperator(operator_id);
  if (resp.error) {
    return <div>{resp.error}</div>;
  }
  const sessions = resp.data || [];
  const operatorName = resp.operatorName;
  return (
    <>
      <div className="h-screen grid grid-cols-6">
        <div className="border-r">
          <div className="flex justify-between items-center border-b  p-4">
            <div className="flex flex-col">
              <Link href={"/app/operators"}>
                <span className="text-sm flex items-center gap-2">
                  <ArrowLeft size={12} className="inline-block" />
                  Operators
                </span>
              </Link>
              <h1 className="text-lg font-bold items-center sticky top-0 text-ellipsis max-w-64 text-nowrap">
                {operatorName}
              </h1>
            </div>
            <Link href={`/chat/${operator_id}/sessions`}>
              <div className="p-2 text-slate-600 hover:text-slate-800 transition-all">
                <MessageCircle size={22} />
              </div>
            </Link>
          </div>
          <div>
            {sessions.map((session) => {
              return (
                <Link
                  key={session.id}
                  href={`/chat/${operator_id}/sessions/${session.id}`}
                >
                  <div className={cn("p-4 border-b border-slate-100 flex justify-between items-center group", {
                    "bg-slate-300": session_id === session.id,
                  })}>
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

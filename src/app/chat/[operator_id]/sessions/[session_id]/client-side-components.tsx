"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendMessage } from "@/server-functions/messages";
import { ArrowUp, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export const SendMessage = ({ session_id }: { session_id: string }) => {
  const [msg, setMsg] = useState("");
  const router = useRouter();
  const handler = useCallback(async () => {
    if (msg) {
      const resp = await sendMessage(session_id, msg);
      if (resp.error) {
        return;
      }
      setMsg("");
      router.refresh();
    }
  }, [msg, session_id, router]);
  return (
    <form
      className="relative flex gap-1 max-w-full w-3/4 group"
      onSubmit={async (e) => {
        e.preventDefault();
        handler();
      }}
    >
      <div className="w-full bg-white rounded-3xl focus-within:shadow-sm focus-within:border-slate-400 overflow-clip border border-slate-200 transition-all p-4">
        <textarea
          rows={5}
          value={msg}
          placeholder="Type a message..."
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (!e.shiftKey) {
                handler();
                e.preventDefault();
                e.currentTarget.blur();
              }
            }
          }}
          className=" border-none outline-none h-12 sticky bottom-0 w-full "
        />
      </div>

      <div className="absolute right-1 bottom-2 p-1">
        <Button className="rounded-full h-12" type="submit" disabled={!msg}>
          <ArrowUp />
        </Button>
      </div>
    </form>
  );
};

"use client";
import { Button } from "@/components/ui/button";
import { sendMessage } from "@/server-functions/messages";
// import { streamData } from "@/server-functions/stream";
import { ArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const SendMessage = ({ session_id, startStream }: { session_id: string, startStream: boolean }) => {
  const [msg, setMsg] = useState("");
  const router = useRouter();
  const handler = useCallback(async () => {
    if (msg || startStream) {
      const resp = await sendMessage(session_id, msg);
      if ((resp as { error: string })?.error) {
        return;
      }
      const stream = resp as ReadableStream<{data: string}>;
      const reader = stream.getReader();
      let content = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        content += value;
      }
      // setMsg(content);
      router.refresh();
    }
  }, [msg, session_id, router]);
  useEffect(() => {
    if (startStream) {
      handler();
    }
  },[])
  return (
    <form
      className="relative flex gap-1 max-w-full w-3/4 group"
      onSubmit={async (e) => {
        e.preventDefault();
        handler();
        setMsg("")
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
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              if (!e.shiftKey) {
                e.preventDefault(); // Prevent default behavior (e.g., new line)
                handler(); // Send the message
                setMsg(""); // Clear the text area
                e.currentTarget.blur(); // Remove focus from the text area
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

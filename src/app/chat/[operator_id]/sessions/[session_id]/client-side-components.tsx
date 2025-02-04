"use client";
import { Button } from "@/components/ui/button";
import { sendMessage } from "@/server-functions/messages";
import { ArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import markdownit from "markdown-it";
import cn from "classnames";

export const Chat = ({
  session_id,
  startStream,
  messages,
}: {
  session_id: string;
  startStream: boolean;
  messages: { id: string; text: string; sender: string }[];
}) => {
  const [msg, setMsg] = useState("");
  const router = useRouter();
  const md = markdownit();
  const [userMessage, setUserMessage] = useState("");
  const [streamingMessage, setStreamingMessage] = useState("");
  const handler = useCallback(async () => {
    setMsg("");
    setUserMessage(msg);
    if (msg || startStream) {
      const resp = await sendMessage(session_id, msg);
      if ((resp as { error: string })?.error) {
        return;
      }
      const stream = resp as ReadableStream<{ data: string }>;
      const reader = stream.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setStreamingMessage((c) => {
          return c + value.data;
        });
      }
      setStreamingMessage("");
      setUserMessage("");
      router.refresh();
    }
  }, [msg, session_id, router, startStream]);
  useEffect(() => {
    if (startStream) {
      handler();
    }
  }, [startStream, handler]);
  return (
    <div className="flex flex-col h-screen relative">
      <div className="flex-1 overflow-y-auto p-4 flex flex-col">
        <div className="max-w-full w-3/4 mx-auto flex flex-col-reverse gap-4">
          <div className="h-[100px]"></div>

          {streamingMessage && (
            <div className="flex justify-start">
              <div
                className="bg-slate-100 p-3 px-6 rounded-lg flex-wrap text-left"
                dangerouslySetInnerHTML={{
                  __html: md.render(streamingMessage),
                }}
              />
            </div>
          )}
          {userMessage && (
            <div className="flex justify-end">
              <div
                className="bg-slate-100 p-3 px-6 rounded-lg flex-wrap text-right"
                dangerouslySetInnerHTML={{
                  __html: md.render(userMessage),
                }}
              />
            </div>
          )}
          {messages?.map((msg) => {
            return (
              <div
                key={msg.id}
                className={cn("flex", {
                  "justify-end": msg.sender == "user",
                  "justify-start": msg.sender == "assistant",
                })}
              >
                <div
                  className={cn("bg-slate-100 p-3 px-6 rounded-lg flex-wrap", {
                    "text-right": msg.sender == "user",
                    "text-left": msg.sender == "assistant",
                  })}
                  dangerouslySetInnerHTML={{ __html: md.render(msg.text) }}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-center pb-6 absolute bottom-0 w-full">
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
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  if (!e.shiftKey) {
                    e.preventDefault();
                    e.currentTarget.blur();
                    handler();
                    setMsg("");
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
      </div>
    </div>
  );
};

"use client";
import { Button } from "@/components/ui/button";
import { sendMessage } from "@/server-functions/messages";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SendMessage = ({session_id}:{session_id: string}) => {
  const [msg, setMsg] = useState("");
  const router = useRouter();
  return (
    <form className="flex items-center gap-2 p-4 border-t bg-white"
    onSubmit={async (e)=>{
      e.preventDefault();
      setMsg("")
      const resp = await sendMessage(session_id, msg)
      if (resp.error){
        console.log(resp.error)
        return
      }
      router.refresh()
    }}>
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        value={msg}
        onChange={(e)=>{
          setMsg(e.target.value);
        }}
      />
      <Button className="p-2 bg-blue-300" type="submit">Send</Button>
    </form>
  );
};

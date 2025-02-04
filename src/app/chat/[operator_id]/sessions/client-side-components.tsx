"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  createChatSession,
  deleteChatSession,
} from "@/server-functions/sessions";
import { Send } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CreateChatButton() {
  const { operator_id } = useParams();
  const router = useRouter();
  const operatorId = Array.isArray(operator_id) ? operator_id[0] : operator_id;
  if (!operatorId) {
    return null;
  }
  return (
    <button
      onClick={async () => {
        await createChatSession(operatorId, "default-chat");
        router.refresh();
      }}
      className="px-4 py-2 bg-blue-500 text-white rounded-md"
    >
      Create Chat Session
    </button>
  );
}

export function DeleteChatSessionButton({ id }: { id: string }) {
  const router = useRouter();
  const {operator_id} = useParams();
  return (
    <DropdownMenuItem
      onClick={async () => {
        await deleteChatSession(id);
        router.replace(`/chat/${operator_id}/sessions`);
        router.refresh();
      }}
    >
      <span className="text-destructive">Delete</span>
    </DropdownMenuItem>
  );
}

export function CreateSessionForm() {
  const [message, setMessage] = useState("");
  const params = useParams() as { operator_id: string };
  const router = useRouter();
  return (
    <form
      className="relative flex gap-1"
      onSubmit={async (e) => {
        e.preventDefault();
        if (message) {
          const resp = await createChatSession(params.operator_id, message);
          if (resp.error) {
            return;
          }
          const chatSession = resp.data;
          router.replace(
            `/chat/${params.operator_id}/sessions/${chatSession.id}`
          );
        }
      }}
    >
      <Input
        placeholder="Type a message..."
        className="rounded-full max-w-md px-4 py-2 h-12 sticky bottom-0 w-[500px]"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        value={message}
      />
      <div className="absolute right-0 top-0 bottom-0 p-1">
        <Button className="rounded-full h-full" type="submit">
          <Send />
          Send
        </Button>
      </div>
    </form>
  );
}

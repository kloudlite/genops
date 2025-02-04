"use client";
import { deleteChatSession } from "@/server-functions/sessions";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  return (
    <TrashIcon
      onClick={async () => {
        await deleteChatSession(id);
        router.refresh();
      }}
      className="text-red-500 hover:text-red-700 cursor-pointer"
    />
  );
}

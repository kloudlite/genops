"use client";
import { deleteChatSession } from "@/server-functions/sessions";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await deleteChatSession(id);
        router.refresh();
      }}
      className="px-4 py-2 bg-red-500 text-white rounded-md ml-2"
    >
      Delete
    </button>
  );
}

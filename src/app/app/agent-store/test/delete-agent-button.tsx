"use client";
import { deleteAgent } from "@/server-functions/agents";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await deleteAgent(id);
        router.refresh();
      }}
    >
      -x-
    </button>
  );
}
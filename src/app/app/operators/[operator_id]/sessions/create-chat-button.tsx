"use client";
import { createChatSession } from "@/server-functions/sessions";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function CreateButton() {
  const { operator_id } = useParams();
  const router = useRouter()

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
      className="px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500"
    >
      Create Chat Session
    </button>
  );
}

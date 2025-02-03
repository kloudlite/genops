"use client";
import { deleteOperator } from "@/server-functions/operators";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await deleteOperator(id);
        router.refresh();
      }}
    >
      -x-
    </button>
  );
}

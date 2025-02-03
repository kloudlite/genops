"use client";

import { createAnOperator } from "@/server-functions/operators";
import { useRouter } from "next/navigation";

export default function CreateButton() {
  const router = useRouter()
  return (
    <button
      onClick={async () => {
        await createAnOperator({
          name: "Test",
          baseAgent: "Base",
          instruction: "Test",
          tools: [
            {
              name: "Test",
              params: {
                hello: "Test",
              },
            },
            {
              name: "Test2",
              params: {
                hello: "Test",
              },
            },
            {
              name: "Test3",
              params: {
                hello: "Test",
              },
            },
          ],
        });
        router.refresh()
      }}
    >
      create
    </button>
  );
};

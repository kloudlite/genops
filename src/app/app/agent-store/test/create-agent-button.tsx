"use client";

import { createAnAgent } from "@/server-functions/agents";
import { useRouter } from "next/navigation";

export default function CreateButton() {
  const router = useRouter()
  return (
    <button
      onClick={async () => {
        await createAnAgent({
          name: "Base",
          developer: "Mohit",
          desc: "Test desc",
          modelProvider: "chatgpt",
          model: "gpt-3.5-turbo",
          tools: [
            {
              name: "Test",
              desc: "Test desc",
              source: "Test source",
            },
            {
              name: "Test2",
              desc: "Test desc",
              source: "Test source",
            },
            {
              name: "Test3",
              desc: "Test desc",
              source: "Test source",
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
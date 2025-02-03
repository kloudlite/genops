"use client";

import { createAnAgent } from "@/server-functions/agents";
import { useRouter } from "next/navigation";

export default function CreateButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await createAnAgent({
          name: "Test",
          desc: "Test",
          model: "Test",
          modelProvider: "Test",
          tools: [
            {
              name: "Test",
              desc: "Test Desc",
              source: "test-source",
            },
            {
              name: "Test2",
              desc: "Test Desc",
              source: "test-source",
            },
            {
              name: "Test3",
              desc: "Test Desc",
              source: "test-source",
            },
          ],
        });
        router.refresh();
      }}
    >
      create
    </button>
  );
}

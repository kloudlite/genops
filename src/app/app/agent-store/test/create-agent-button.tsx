"use client";

import { createAnAgent } from "@/server-functions/agents";
import { useRouter } from "next/navigation";

export default function CreateButton() {
  const router = useRouter()
  return (
    <button
      onClick={async () => {
        await createAnAgent({
          name: "Github Agent",
          developer: "Mohit",
          desc: "Checks if any new pull requests are available",
          modelProvider: "openai",
          model: "gpt-4o",
          tools: [
            {
              name: "Github Tool",
              desc: "Checks if any new pull requests are available",
              source: "Github",
              params: [
                {
                  name: "username",
                  type: "string",
                  required: true,
                  defaultValue: "nxtcoder36",
                },
                {
                  name: "repo",
                  type: "string",
                  required: true,
                  defaultValue: "kloudlite/genops",
                },
                {
                  name: "branch",
                  type: "string",
                  required: true,
                  defaultValue: "main",
                },
              ],
            },
            // {
            //   name: "Test2",
            //   desc: "Test desc",
            //   source: "Test source",
            // },
            // {
            //   name: "Test3",
            //   desc: "Test desc",
            //   source: "Test source",
            // },
          ],
        });
        router.refresh()
      }}
    >
      create
    </button>
  );
};
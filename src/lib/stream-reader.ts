import { Operator } from "@/orm/entities/operators";

export default async function fetchStream(messages: object[], operator: Operator, onMessage: (message: string | null, done: boolean) => void) {
  const response = await fetch("http://localhost:4000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: messages,
      stream: true
      // op.des, agents. des, tools, toolsparams
    }),
  });
  console.log("fetch stream", response);
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let content = "";

  if (reader) {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      let chunk = decoder.decode(value, { stream: true });
      chunk = chunk.replaceAll("$\n\n", "")
      if (chunk.startsWith("$data:$")) {
        chunk = chunk.replaceAll("$data:$", "")
        content += chunk;
        onMessage(chunk, false);
      }
    }
    onMessage(content, true);
    return content;
  }
}
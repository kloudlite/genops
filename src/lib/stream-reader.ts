import { Operator } from "@/orm/entities/operators";

export default async function fetchStream(messages: object[], operator: Operator, onMessage: (message: string | null, done: boolean) => void, setTitle: (title: string) => void) {
  if (messages.length === 0) {
    return;
  }
  if(messages.length <= 2) {
    // It will be first conversation
    messages.push({
      content: "Generate title for the conversation before starting",
      role: "system",
    });
  }
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
      
      if(chunk.startsWith("$function_call:$")) {
        chunk.split("$function_call:$").forEach((chunk) => {
          if(chunk === "") return;
          const functionName = chunk.split(" ")[0];
          chunk = chunk.replace(functionName, "");
          const args = JSON.parse(chunk);
          if(functionName === "name_conversation") {
            setTitle(args.title);
            return
          }
          const codeChunk= `\n- \`\`\`${functionName.replaceAll("-",".")}(${JSON.stringify(args)})\`\`\`\n\n`;
          content += codeChunk;
          onMessage(codeChunk, false);
        });
      }
    }
    onMessage(content, true);
    return content;
  }
}
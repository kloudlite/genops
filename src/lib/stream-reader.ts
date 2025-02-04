import { Agent } from "@/orm/entities/agents";
import { DeepPartial } from "typeorm";

export default async function fetchStream(messages: object[], agent: DeepPartial<Agent>) {
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: messages,
        stream: true,
        agent: agent,
      }),
    });
  
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let content = "";
  
    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        content += decoder.decode(value, { stream: true });
      }
    }
  
    return content;
}
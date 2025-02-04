// app/actions/streamData.js
"use server";

export async function streamData() {
  return new ReadableStream({
    async start(controller) {
      while (true) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("hi");
        controller.enqueue({ data: Math.random() });
      }
    },
  });
}
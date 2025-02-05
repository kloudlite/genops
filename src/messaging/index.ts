import { connect, RetentionPolicy } from "nats";

const nc = await connect({
  servers: [process.env.NATS_ADDRESS || "localhost:4222"],
});

const stremManager =await nc.jetstreamManager()
stremManager.streams.add({
  name: "genops",
  subjects: ["chats.>"],
  retention: RetentionPolicy.Limits,
  max_msg_size: 1024,
});

export default nc;
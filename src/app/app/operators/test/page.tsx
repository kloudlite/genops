import { getUserOperators } from "@/server-functions/operators";
import CreateOperatorButton from "./create-operator-button";
import DeleteOperatorButton from "./delete-operator-button";
import CreateAgentButton from "./create-agent-button";
import DeleteAgentButton from "./delete-agent-button";
import { getDeveloperAgents } from "@/server-functions/agents";

export default async function Page() {
  const response = await getUserOperators();
  if (response.error) {
    return "Error";
  }
  const ops = response.data;

  const agentsResponse = await getDeveloperAgents();
  if (agentsResponse.error) {
    return "Error";
  }
  const agents = agentsResponse.data;

  return (
    <div>
      <h1 className="text-4xl">Operators</h1>
      {ops?.map((op) => {
        return (
          <div key={op.id}>
            {op.name} {op.instruction}
            <DeleteOperatorButton id={op.id} />
          </div>
        );
      })}
      <CreateOperatorButton />
      <hr />
      <h1 className="text-4xl">Agents</h1>
      {agents?.map((agent) => {
        return (
          <div key={agent.id}>
            {agent.name} {agent.desc}
            <DeleteAgentButton id={agent.id} />
          </div>
        );
      })}
      <CreateAgentButton />
    </div>
  );
}

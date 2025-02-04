"use server";
import { getDeveloperAgents } from "@/server-functions/agents";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Page = async () => {
  const resp = await getDeveloperAgents();
  if (resp.error) {
    return "Error loading agents";
  }
  const agents = resp.data;
  return (
    <div className="flex flex-col w-full h-screen">
      <h1 className="text-2xl font-bold p-4 flex w-full items-center">
        Agents
      </h1>
      <div className="grid grid-cols-4 gap-4 p-4">
        {agents?.map((agent) => {
          return (
            <Card key={agent.id}>
              <CardHeader>
                <CardTitle>{agent.name}</CardTitle>
              </CardHeader>
              <CardContent>{agent.desc}</CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Page;

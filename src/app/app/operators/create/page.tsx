"use server";

import CreateOperatorForm from "./client-components";
import { getAllAgentsMetadata } from "@/server-functions/agents";

const Page = async () => {
  const resp = await getAllAgentsMetadata();
  if (resp.error) {
    return <div>{resp.error}</div>;
  }
  const agentData = resp.data;
  return (
    <div className="min-h-screen grid grid-cols-2">
      <div className="border-r  p-4">
        <h1 className="text-2xl font-bold p-4">Create Operator</h1>
      </div>
      <CreateOperatorForm  agentData={agentData?.agents}/>
    </div>
  );
};

export default Page;

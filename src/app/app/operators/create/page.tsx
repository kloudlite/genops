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
      <div className="border-r p-4 flex gap-4 flex-col">
        <CreateOperatorForm  agentData={agentData?.agents}/>
      </div>
    </div>
  );
};

export default Page;

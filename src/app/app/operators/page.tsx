"use server";
import { getUserOperators } from "@/server-functions/operators";
import { getDeveloperAgents } from "@/server-functions/agents";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SettingsPopover from "./settings-popover";


const Page = async () => {
  const result = await getUserOperators();
  if (result.error) {
    return "Error loading operators";
  }
  const { data: operators } = result;

  const agentData = await getDeveloperAgents();
  if (result.error) {
    return "Error loading agents";
  }
  const { data: agents } = agentData;
  return (
    <div className="flex flex-col w-full h-screen">
      <h1 className="text-2xl font-bold p-4 flex w-full justify-center items-center">GenOps</h1>
      <Tabs defaultValue="operators" className="w-full">
        <TabsList className="flex w-full sm:justify-start justify-center pl-2 h-[60px]">
          <TabsTrigger value="operators">Operators</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
        </TabsList>
        <TabsContent value="operators">
          <h1 className="text-2xl font-bold p-4">Operators</h1>
          <div className="flex w-full items-center sm:justify-end justify-center p-2">
            <Button asChild className="w-fit mr-2">
              <Link href="/app/operators/create">New Operator</Link>
            </Button>
          </div>
          <div className="flex w-full overflow-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {operators?.length === 0 ? (
                <div className="col-span-full text-center text-red-500 pt-10">
                  <p>No operators found. Please add one.</p>
                </div>
              ) : (
                operators?.map((operator) => (
                  <Card
                    key={operator.id}
                    className="shadow-md hover:shadow-lg transition sm:w-[300px] w-full relative"
                  >
                    <CardHeader className="relative">
                      <CardTitle>{operator.name}</CardTitle>
                      <div className="absolute top-2 right-2">
                        <SettingsPopover />
                      </div>
                    </CardHeader>

                    <CardContent className="flex flex-row items-center justify-between">
                      <p className="p-2">{operator.instruction}</p>
                      <Button className="mt-4 flex items-center gap-1">
                        <ChevronRight size={16} />
                      </Button>
                    </CardContent>
                  </Card>

                ))
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="agents">
          <h1 className="text-2xl font-bold p-4">Agents</h1>
          <div className="flex w-full items-center sm:justify-end justify-center p-2">
            <Button asChild className="w-fit mr-2">
              <Link href="/app/operators/create">New Agents</Link>
            </Button>
          </div>
          <div className="flex w-full overflow-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {agents?.length === 0 ? (
                <div className="col-span-full text-center text-red-500 pt-10">
                  <p>No Agents found. Please add one.</p>
                </div>
              ) : (
                agents?.map((agent) => (
                  <Card
                    key={agent.id}
                    className="shadow-md hover:shadow-lg transition w-full sm:w-[300px]">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-gray-800">{agent.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                      <div className="flex flex-row ">
                        <div className="flex flex-col space-y-2">
                          <div className="flex flex-col">
                            <p className="text-lg text-black font-medium p-2">Description:</p>
                            <p className="text-sm text-gray-600 p-2">{agent.desc}</p>
                          </div>

                          <div className="flex flex-col">
                            <p className="text-lg text-black font-medium p-2">Model:</p>
                            <p className="text-sm text-gray-600 p-2">{agent.model}</p>
                          </div>

                          <div className="flex flex-col">
                            <p className="text-lg text-black font-medium p-2">Model Provider:</p>
                            <p className="text-sm text-gray-600 p-2">{agent.modelProvider}</p>
                          </div>

                        </div>
                        {/* <div className="flex flex-col space-y-2">
                <div className="w-full sm:w-auto">
                        {agent.tools?.map((tool, index) => (
                          <div key={index} className="space-y-2">
                            <h3 className="font-medium text-gray-800">{tool.name}</h3>
                            <p className="text-sm text-gray-600">{tool.desc}</p>
                            {tool.params?.map((param, paramIndex) => (
                              <div key={paramIndex} className="ml-4">
                                <p className="text-sm text-gray-500">{param.name} ({param.type}): {param.required ? "Required" : "Optional"}</p>
                                <p className="text-xs text-gray-400">Default: {param.defaultValue}</p>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                      </div> */}
                      </div>

                      <Button className="mt-4 flex items-center gap-1 text-white rounded-lg">
                        <ChevronRight size={16} />
                      </Button>
                    </CardContent>
                  </Card>

                ))
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;


{/* <div className="flex flex-col w-full h-screen">
<h1 className="text-3xl font-bold p-4">Home</h1>
<h1 className="text-2xl font-bold p-4">Operators</h1>
<div className="flex w-full items-center sm:justify-end justify-center p-2">
  <Button asChild className="w-fit">
    <Link href="/app/operators/create">New Operator</Link>
  </Button>
</div>
<div className="flex w-full overflow-auto">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
    {operators?.length === 0 ? (
      <div className="col-span-full text-center text-red-500 pt-10">
        <p>No operators found. Please add one.</p>
      </div>
    ) : (
      operators?.map((operator) => (
        <Card
          key={operator.id}
          className="shadow-md hover:shadow-lg transition sm:w-[300px] w-full"
        >
          <CardHeader>
            <CardTitle>{operator.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-row items-center justify-between">
            <p className="p-2">{operator.instruction}</p>
            <Button className="mt-4 flex items-center gap-1">
              <ChevronRight size={16} />
            </Button>
          </CardContent>
        </Card>
      ))
    )}

  </div>
</div>
</div> */}
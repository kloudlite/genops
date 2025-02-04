"use client";

import { Accordion, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Agent } from "@/orm/entities/agents";
import { getAgent } from "@/server-functions/agents";
import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, ArrowRight, ListRestart } from "lucide-react";
import { useEffect, useState } from "react";

export default function CreateOperatorForm({
  agentData,
}: {
  agentData: { id: string; name: string }[] | undefined;
}) {
  const [currentStep, setCurrentStep] = useState("basic_details");
  const [operatorName, setOperatorName] = useState("");
  const [agentId, setAgentId] = useState("");
  const [description, setDescription] = useState("");
  const [toolParams, setToolParams] = useState<Record<string, string>>({});
  const [agent, setAgent] = useState<Agent | undefined>(undefined);
  useEffect(() => {
    if (!agentId) {
      return;
    }
    (async () => {
      setAgent(undefined);
      const resp = await getAgent(agentId);
      if (resp.error) {
        return;
      }
      setAgent(resp.data);
    })();
  }, [agentId]);
  return (
    <div className="flex items-center justify-center flex-col gap-4">
      {currentStep === "basic_details" && (
        <Card className="grid max-w-sm w-full rounded-none shadow-none">
          <CardHeader>
            <h1 className="text-lg font-bold">Basic Details</h1>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid w-full items-center gap-1.5">
              <Label>Name</Label>
              <Input
                id="name"
                placeholder="Choose Operator username"
                value={operatorName}
                onChange={(e) => setOperatorName(e.target.value)}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label>Base Agent</Label>
              <Select onValueChange={(v) => setAgentId(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {agentData?.map((a) => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the operator"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button className="btn" variant={"outline"}>
              <ListRestart />
              Reset
            </Button>
            <Button
              className="btn"
              disabled={!operatorName || !agent || !description}
              onClick={() => setCurrentStep("setup_tools")}
            >
              Setup Tools
              <ArrowRight />
            </Button>
          </CardFooter>
        </Card>
      )}
      {currentStep === "setup_tools" && (
        <Card className="grid max-w-sm w-full rounded-none shadow-none">
          <CardHeader>
            <h1 className="text-lg font-bold">Setup Tools</h1>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              orientation="horizontal"
            >
              {agent?.tools.map((tool) => {
                return (
                  <AccordionItem
                    key={tool.name}
                    value={tool.name}
                    disabled={tool.params?.length == 0}
                  >
                    <AccordionTrigger>
                      <div className="flex justify-between w-full items-center">
                        <span>{tool.name}</span>
                        <span className="px-4 text-xs text-slate-500">
                          {tool.desc}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {(!tool.params || tool.params.length === 0) && (
                        <div className="text-slate-500 text-sm">
                          No parameters required
                        </div>
                      )}
                      <div className="grid gap-4">
                        {tool.params?.map((param) => {
                          return (
                            <div
                              key={param.name}
                              className="grid w-full items-center gap-1.5"
                            >
                              <Label>{param.name}</Label>
                              {param.type === "string" && (
                                <Input
                                  id={param.name}
                                  placeholder={param.name}
                                  value={toolParams[param.name]}
                                  onChange={(e) =>
                                    setToolParams({
                                      ...toolParams,
                                      [param.name]: e.target.value,
                                    })
                                  }
                                />
                              )}
                              {param.type === "secure-string" && (
                                <Input
                                  id={param.name}
                                  placeholder={param.name}
                                  value={toolParams[param.name]}
                                  type="password"
                                  onChange={(e) =>
                                    setToolParams({
                                      ...toolParams,
                                      [param.name]: e.target.value,
                                    })
                                  }
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              className="btn"
              variant={"outline"}
              onClick={() => setCurrentStep("basic_details")}
            >
              <ArrowLeft />
            </Button>
            <Button
              className="btn"
              onClick={() => setCurrentStep("basic_details")}
            >
              Create Operator
            </Button>
          </CardFooter>
        </Card>
      )}

      <div className="flex gap-2">
        <div className="w-12 h-2 bg-black rounded-full" />
        <div className="w-4 h-2 bg-slate-300 rounded-full" />
      </div>
    </div>
  );
}

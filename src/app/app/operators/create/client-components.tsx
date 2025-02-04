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
import cn from "classnames";
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
import { ArrowLeft, ArrowRight, HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

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
    <Card className="grid max-w-xl w-full rounded-none shadow-none border-none">
      <CardHeader className="pb-8">
        <h1 className="text-2xl font-bold">Create Operator</h1>
        <div className="flex gap-4">
          <h1
            className={cn("text-lg", {
              "text-slate-400": currentStep !== "basic_details",
              "font-medium": currentStep == "basic_details",
            })}
          >
            Basic Details
          </h1>
          <h1
            className={cn("text-lg", {
              "text-slate-400": currentStep !== "setup_tools",
              "font-medium": currentStep == "setup_tools",
            })}
          >
            Tools Setup
          </h1>
        </div>
      </CardHeader>
      {currentStep === "basic_details" && (
        <>
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
          <CardFooter className="flex justify-end">
            <Button
              className="btn"
              disabled={!operatorName || !agent || !description}
              onClick={() => setCurrentStep("setup_tools")}
            >
              Setup Tools
              <ArrowRight />
            </Button>
          </CardFooter>
        </>
      )}
      {currentStep === "setup_tools" && (
        <>
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
                    className="border-slate-100"
                    key={tool.name}
                    value={tool.name}
                    disabled={tool.params?.length == 0}
                  >
                    <AccordionTrigger className="group">
                      <span className="flex items-center justify-between gap-2 w-full">
                        {tool.name}
                        <HoverCard>
                          <HoverCardTrigger className="px-2">
                            <HelpCircle
                              size={18}
                              className="text-slate-500 invisible group-hover:visible"
                            />
                          </HoverCardTrigger>
                          <HoverCardContent side="right">
                            <div className="text-slate-500 text-sm">
                              {tool.desc}
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="py-4">
                      <div className="grid gap-4">
                        {(!tool.params || tool.params.length === 0) && (
                          <div className="text-slate-500 text-sm">
                            No parameters required
                          </div>
                        )}
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
                                  value={toolParams[param.name] || ""}
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
                                  value={toolParams[param.name] || ""}
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
        </>
      )}
    </Card>
  );
}

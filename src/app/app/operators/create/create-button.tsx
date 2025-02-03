"use client";

import { useState } from "react";
import { createAnOperator } from "@/server-functions/operators";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus, Trash, Home } from "lucide-react";


interface Tool {
    name: string;
    params: {
        hello: string;
    };
}

interface Operator {
    name: string;
    baseAgent: string;
    instruction: string;
    tools: Tool[];
}

const CreateOperator = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [operatorData, setOperatorData] = useState<Operator>({
        name: "",
        baseAgent: "",
        instruction: "",
        tools: [{ name: "", params: { hello: "" } }],
    });

    const [errors, setErrors] = useState({ name: "", baseAgent: "", instruction: "" });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: string,
        index?: number
    ) => {
        const { value } = e.target;
        setErrors((prev) => ({ ...prev, [field]: "" }));

        if (["name", "baseAgent", "instruction"].includes(field)) {
            setOperatorData((prevData) => ({ ...prevData, [field]: value }));
        } else if (field === "toolName" && index !== undefined) {
            const updatedTools = [...operatorData.tools];
            updatedTools[index].name = value;
            setOperatorData({ ...operatorData, tools: updatedTools });
        } else if (field === "toolParam" && index !== undefined) {
            const updatedTools = [...operatorData.tools];
            updatedTools[index].params.hello = value;
            setOperatorData({ ...operatorData, tools: updatedTools });
        }
    };

    const handleAddTool = () => {
        setOperatorData((prevData) => ({
            ...prevData,
            tools: [...prevData.tools, { name: "", params: { hello: "" } }],
        }));
    };

    const handleRemoveTool = (index: number) => {
        const updatedTools = operatorData.tools.filter((_, i) => i !== index);
        setOperatorData({ ...operatorData, tools: updatedTools });
    };

    const validateStepOne = () => {
        let valid = true;
        const newErrors = { name: "", baseAgent: "", instruction: "" };

        if (!operatorData.name.trim()) {
            newErrors.name = "Operator Name is required.";
            valid = false;
        }
        if (!operatorData.baseAgent.trim()) {
            newErrors.baseAgent = "Base Agent is required.";
            valid = false;
        }
        if (!operatorData.instruction.trim()) {
            newErrors.instruction = "Instruction is required.";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleNext = () => {
        if (validateStepOne()) {
            setStep(2);
        }
    };

    const handleCreateOperator = async () => {
        try {
            const response = await createAnOperator(operatorData);
            if (response?.error) {
                console.error("Failed to create operator");
            } else {
                router.push("/app/operators");
            }
        } catch (error) {
            console.error("Error creating operator:", error);
        }
    };

    return (
        <div className="w-full">
            <div className="absolute top-4 right-4">
                <Button onClick={() => { router.push("/app/operators") }}><Home /></Button>
            </div>
            <div className="sm:max-w-[800px] max-w-2xl mx-auto p-6 space-y-6">

                <h1 className="text-2xl font-semibold">
                    {step === 1 ? "1. Enter operator details" : "2. Configure tools"}
                </h1>
                <Progress value={step === 1 ? 50 : 100} className="h-2" />

                {step === 1 && (
                    <div>
                        <Card>
                            <CardContent className="space-y-3 pt-5">
                                <h2 className="text-sm font-bold">Operator Name</h2>
                                <Input
                                    className="sm:h-[50px] h-8"
                                    type="text"
                                    value={operatorData.name}
                                    onChange={(e) => handleInputChange(e, "name")}
                                    placeholder="myop"
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                                <h2 className="text-sm font-bold">Base Agent</h2>
                                <Input
                                    className="sm:h-[50px] h-8"
                                    type="text"
                                    value={operatorData.baseAgent}
                                    onChange={(e) => handleInputChange(e, "baseAgent")}
                                    placeholder="mail agent"
                                />
                                {errors.baseAgent && <p className="text-red-500 text-sm">{errors.baseAgent}</p>}

                                <h2 className="text-sm font-bold">Instructions</h2>
                                <Input
                                    className="sm:h-[50px] h-8"
                                    type="text"
                                    value={operatorData.instruction}
                                    onChange={(e) => handleInputChange(e, "instruction")}
                                    placeholder="use this to send emails"
                                />
                                {errors.instruction && <p className="text-red-500 text-sm">{errors.instruction}</p>}

                                <Button onClick={handleNext} className="w-full sm:h-[50px] h-8">
                                    Next
                                </Button>

                            </CardContent>
                        </Card>
                    </div>
                )}

                {step === 2 && (
                    <Card>
                        <CardContent className="space-y-3 pt-5">
                            <h3 className="text-lg font-semibold">Tools</h3>
                            {operatorData.tools.map((tool, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <Input
                                        type="text"
                                        value={tool.name}
                                        onChange={(e) => handleInputChange(e, "toolName", index)}
                                        placeholder="Tool Name"
                                        className="flex-1"
                                    />
                                    <Input
                                        type="text"
                                        value={tool.params.hello}
                                        onChange={(e) => handleInputChange(e, "toolParam", index)}
                                        placeholder="Tool Param"
                                        className="flex-1"
                                    />
                                    <Button variant="destructive" size="icon" onClick={() => handleRemoveTool(index)}>
                                        <Trash size={16} />
                                    </Button>
                                </div>
                            ))}
                            <Button variant="outline" onClick={handleAddTool} className="w-full">
                                <Plus className="mr-2" size={16} /> Add Tool
                            </Button>

                            <div className="flex justify-between gap-4">
                                <Button variant="outline" onClick={() => setStep(1)}>
                                    Back
                                </Button>
                                <Button onClick={handleCreateOperator}>
                                    Create Operator
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default CreateOperator;

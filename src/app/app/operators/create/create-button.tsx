"use client";

import { useState } from "react";
import { createAnOperator } from "@/server-functions/operators";
import { useRouter } from "next/navigation";

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
    const [operatorData, setOperatorData] = useState<Operator>({
        name: "",
        baseAgent: "",
        instruction: "",
        tools: [
            { name: "", params: { hello: "" } },
        ],
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: string,
        index?: number
    ) => {
        const { value } = e.target;

        if (field === "name" || field === "baseAgent" || field === "instruction") {
            setOperatorData((prevData) => ({
                ...prevData,
                [field]: value,
            }));
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
            tools: [
                ...prevData.tools,
                { name: "", params: { hello: "" } },
            ],
        }));
    };


    const handleCreateOperator = async () => {
        try {
            const response  = await createAnOperator(operatorData);
            console.log(response)
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
        <div>
            <h2>Create a New Operator</h2>
            <div>
                <label>
                    Operator Name:
                    <input
                        type="text"
                        value={operatorData.name}
                        onChange={(e) => handleInputChange(e, "name")}
                        placeholder="Enter Operator Name"
                    />
                </label>
            </div>

            <div>
                <label>
                    Base Agent:
                    <input
                        type="text"
                        value={operatorData.baseAgent}
                        onChange={(e) => handleInputChange(e, "baseAgent")}
                        placeholder="Enter Base Agent"
                    />
                </label>
            </div>

            <div>
                <label>
                    Instruction:
                    <input
                        type="text"
                        value={operatorData.instruction}
                        onChange={(e) => handleInputChange(e, "instruction")}
                        placeholder="Enter Instruction"
                    />
                </label>
            </div>


            <div>
                <h3>Tools</h3>
                {operatorData.tools.map((tool, index) => (
                    <div key={index}>
                        <label>
                            Tool Name:
                            <input
                                type="text"
                                value={tool.name}
                                onChange={(e) => handleInputChange(e, "toolName", index)}
                                placeholder="Enter Tool Name"
                            />
                        </label>
                        <label>
                            Tool Param:
                            <input
                                type="text"
                                value={tool.params.hello}
                                onChange={(e) => handleInputChange(e, "toolParam", index)}
                                placeholder="Enter Tool Param"
                            />
                        </label>
                    </div>
                ))}

                <button type="button" onClick={handleAddTool}>
                    Add Tool
                </button>
            </div>

            <button type="button" onClick={handleCreateOperator}>
                Create Operator
            </button>
        </div>
    );
}
export default CreateOperator;
"use client"
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { getUserOperators } from "@/server-functions/operators";
import { deleteOperator } from "@/server-functions/operators";
import { Plus } from 'lucide-react';
import { Trash } from 'lucide-react';
import { useRouter } from "next/navigation";

interface Tool {
    name: string;
    params: {
        hello: string;
    };
}


interface Operator {
    id: string;
    name: string;
    instruction: string;
    tools: Tool[];
}

export default function CardsList() {
    const [operators, setOperators] = useState<Operator[]>([]);
    const router = useRouter();

    const handleCreate = () => {
        router.push('/app/operators/create');
    };

    const handleDelete = async (operatorId: string) => {
        const response = await deleteOperator(operatorId);
        if (response.error) {
            // console.log(response.error);
        } else {
            await fetchOperators();
        }
    };

    useEffect(() => {
        const fetchOperators = async () => {
            try {
                const response = await getUserOperators();
                setOperators(response?.data ?? []);
            } catch (error) {
                console.error("Error fetching operators:", error);
                return { error };
            }
        };

        fetchOperators();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {operators.length === 0 ? (
                <div className="col-span-full text-center text-red-500 pt-10">
                    <p>No operators found. Please add one.</p>
                </div>
            ) : (
                operators.map((operator) => (
                    <Card key={operator.id} className="shadow-md hover:shadow-lg transition">
                        <CardHeader>
                            <CardTitle>{operator.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-row items-center justify-between">
                            <p>{operator.instruction}</p>
                            {operator.tools.map((tool, index) => (
                                <div key={index}>
                                    <p>Tool Name: {tool.name}</p>
                                    <p>Param: {tool.params.hello}</p>
                                </div>
                            ))}

                            <Button className="mt-4 flex items-center gap-1">
                                <ChevronRight size={16} />
                            </Button>
                            <Button className="" onClick={() => handleDelete(operator.id)}>
                                <Trash size={16} />
                            </Button>
                        </CardContent>
                    </Card>
                ))
            )}
            <div className="fixed bottom-4 right-4">
                <Button className="" onClick={handleCreate}>
                    <Plus size={16} />
                </Button>
            </div>
        </div>
    );
}

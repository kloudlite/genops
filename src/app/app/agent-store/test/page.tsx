import { getDeveloperAgents } from "@/server-functions/agents";
import CreateButton from "./create-agent-button";
import DeleteButton from "./delete-agent-button";

export default async function Page() {
    const response = await getDeveloperAgents();
    if (response.error) {
        return "Error"
    }

    const ops = response.data;
    return (
        <div>
            {ops?.map((op) => {
                return (
                <div key={op.id}>
                    {op.name} {op.model} {op.modelProvider}
                    <DeleteButton  id={op.id} />
                </div>
                );
            })}
            <CreateButton />
        </div>
    );
}
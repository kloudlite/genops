
import { createChatSession } from "@/server-functions/sessions";

export default function CreateButton({ onCreate }: { onCreate?: () => void }) {
    const handleClick = async () => {
        const newSessionData = { model: "default-model" }; // Update with actual model if needed
        await createChatSession(newSessionData);
        if (onCreate) onCreate();
    };

    return (
        <button onClick={handleClick} className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Create Session
        </button>
    );
}

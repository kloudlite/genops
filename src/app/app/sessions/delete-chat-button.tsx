
import { deleteChatSession } from "@/server-functions/sessions";

export default function DeleteButton({ id, onDelete }: { id: string; onDelete?: () => void }) {
    const handleClick = async () => {
        await deleteChatSession(id);
        if (onDelete) onDelete();
    };

    return (
        <button onClick={handleClick} className="px-4 py-2 bg-red-500 text-white rounded-md ml-2">
            Delete
        </button>
    );
}

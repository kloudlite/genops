import { useEffect, useState } from "react";
import { createChatSession, deleteChatSession } from "@/server-functions/sessions";
import CreateButton from "./create-chat-button";
import DeleteButton from "./delete-chat-button";

export default function Page() {
    const [sessions, setSessions] = useState<{ id: string; model: string; messages: { sender: string; text: string }[] }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        const fetchSessions = async () => {
            const response = await getUserChatSessions();
            if (response.error) {
                console.error("Error fetching sessions");
            } else {
                setSessions(response.data);
            }
            setLoading(false);
        };
        fetchSessions();
    }, []);

    const handleCreateSession = async () => {
        const newSessionData = { model: "default-model" };
        const response = await createChatSession(newSessionData);
        if (response.data) {
            setSessions([...sessions, response.data]);
        }
    };

    const handleDeleteSession = async (sessionId: string) => {
        await deleteChatSession(sessionId);
        setSessions(sessions.filter((session) => session.id !== sessionId));
    };

    const handleSendMessage = async (sessionId: string, message: string) => {
        const response = await addMessageToSession(sessionId, { sender: "user", text: message });
        if (response.data) {
            setSessions(sessions.map((session) => (session.id === sessionId ? response.data : session)));
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            {sessions.length === 0 ? <p>No chat sessions found</p> : (
                sessions.map((session) => (
                    <div key={session.id} className="border p-4 my-2 rounded">
                        <p><strong>Model:</strong> {session.model}</p>
                        <p><strong>Messages:</strong></p>
                        <ul className="bg-gray-100 p-2 rounded">
                            {session.messages.map((msg, index) => (
                                <li key={index} className="text-sm">
                                    <strong>{msg.sender}:</strong> {msg.text}
                                </li>
                            ))}
                        </ul>
                        <button 
                            onClick={() => handleSendMessage(session.id, "Hello!")} 
                            className="mt-2 px-3 py-1 bg-green-500 text-white rounded-md"
                        >
                            Send Message
                        </button>
                        <DeleteButton id={session.id} onDelete={() => handleDeleteSession(session.id)} />
                    </div>
                ))
            )}
            <CreateButton onCreate={handleCreateSession} />
        </div>
    );
}

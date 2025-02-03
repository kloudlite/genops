import { listUserSessionsForOperator } from "@/server-functions/sessions";
import CreateButton from "./create-chat-button";
import DeleteButton from "./delete-chat-button";

export default async function Page({
  params,
}: {
  params: Promise<{ operator_id: string }>;
}) {
  const p = await params;
  const operator_id = p.operator_id;

  if (!operator_id) {
    return "No Operator ID";
  }
  const result = await listUserSessionsForOperator(operator_id);
  if (result.error) {
    return "Error";
  }
  const sessions = result.data || [];
  return (
    <div>
      {sessions.length === 0 ? (
        <p>No chat sessions found</p>
      ) : (
        sessions.map((session) => {
          return (
            <div key={session.id}>
              {session.name}
              Session
              <DeleteButton id={session.id} />
            </div>
          );
        })
      )}
      <CreateButton />
    </div>
  );
}

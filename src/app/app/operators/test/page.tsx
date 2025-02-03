import { getUserOperators } from "@/server-functions/operators";
import CreateButton from "./create-operator-button";
import DeleteButton from "./delete-operator-button";

export default async function Page() {
  const response = await getUserOperators();
  if (response.error) {
    return "Error";
  }
  const ops = response.data;
  return (
    <div>
      {ops?.map((op) => {
        return (
          <div key={op.id}>
            {op.name} {op.instruction}
            <DeleteButton  id={op.id} />
          </div>
        );
      })}
      <CreateButton />
    </div>
  );
}

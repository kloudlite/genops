"use server";
import { getUserOperators } from "@/server-functions/operators";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SettingsPopover from "./settings-popover";
import Link from "next/link";

const Page = async () => {
  const result = await getUserOperators();
  if (result.error) {
    return "Error loading operators";
  }
  const { data: operators } = result;

  return (
    <div className="flex flex-col w-full h-screen p-4">
      <h1 className="text-2xl font-bold p-4 flex w-full items-center">
        Operators
      </h1>
      <div className="grid grid-cols-4 gap-4 p-4">
        {operators?.length === 0 && (
          <div className="col-span-4">
            <span className="text-slate-500 text-xl">No operators found!</span>
            <br />
            Create your first operator <Link href="/app/operators/create" className="underline">here</Link>.
          </div>
        )}
        {operators?.map((operator) => {
          return (
            <Card key={operator.id} className="p-4">
              <CardHeader>
                <CardTitle>{operator.name}</CardTitle>
                <SettingsPopover id={operator.id} />
              </CardHeader>
              <CardContent>{operator.instruction}</CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Page;

"use server";
import { getUserOperators } from "@/server-functions/operators";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OperatorDeleteButton } from "./client-components";

const Page = async () => {
  const result = await getUserOperators();
  if (result.error) {
    return "Error loading operators";
  }
  const { data: operators } = result;

  return (
    <div className="flex flex-col w-full h-screen p-4">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-2xl font-bold p-4 items-center">Operators</h1>
        <Button>
          <Link href="/app/operators/create">Create Operator</Link>
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4 p-4">
        {operators?.length === 0 && (
          <div className="col-span-4">
            <span className="text-slate-500 text-xl">No operators found!</span>
            <br />
            Create your first operator{" "}
            <Link href="/app/operators/create" className="underline">
              here
            </Link>
            .
          </div>
        )}
        {operators?.map((operator) => {
          return (
            <Link key={operator.id} href={`/chat/${operator.id}`}>
              <Card className="rounded-none shadow-none hover:shadow-lg transition-all cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex justify-between flex-row items-center">
                    <span>{operator.name}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant={"ghost"}>
                          <EllipsisVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="bottom" align="start">
                        <OperatorDeleteButton id={operator.id} />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardTitle>
                </CardHeader>
                <CardContent>{operator.instruction}</CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Page;

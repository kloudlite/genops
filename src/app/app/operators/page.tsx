"use server";
import { getUserOperators } from "@/server-functions/operators";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const Page = async () => {
  const result = await getUserOperators();
  if (result.error) {
    return "Error loading operators";
  }
  const { data: operators } = result;
  return (
    <div className="flex flex-col w-full h-screen">
      <h1 className="text-3xl font-bold p-4">Home</h1>
      <h1 className="text-2xl font-bold p-4">Operators</h1>
      <div className="flex w-full overflow-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {operators?.length === 0 ? (
            <div className="col-span-full text-center text-red-500 pt-10">
              <p>No operators found. Please add one.</p>
            </div>
          ) : (
            operators?.map((operator) => (
              <Card
                key={operator.id}
                className="shadow-md hover:shadow-lg transition"
              >
                <CardHeader>
                  <CardTitle>{operator.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-row items-center justify-between">
                  <p>{operator.instruction}</p>
                  <Button className="mt-4 flex items-center gap-1">
                    <ChevronRight size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
          <Button asChild>
            <Link href="/app/operators/create">New Operator</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;

import { Card, CardHeader } from "@/components/ui/card";
import { SingInForm } from "./signin-form";
import { Lock } from "lucide-react";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 h-screen">
      <Card className="grid max-w-sm w-full">
        <CardHeader>
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold flex gap-1">
              <Lock />
              Sign in to GenOps
            </h2>
            <h3 className="text text-slate-500 mb-4">
              Access your account
            </h3>
          </div>
        </CardHeader>
        <SingInForm />
      </Card>
    </div>
  );
};

export default Page;

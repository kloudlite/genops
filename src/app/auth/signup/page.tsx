import { Card, CardHeader } from "@/components/ui/card";
import { SignupForm } from "./singup-form";
import { ScanFace } from "lucide-react";



const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 h-screen">
      <Card className="grid max-w-sm w-full">
        <CardHeader>
            <div className="flex flex-col">
            <h2 className="text-xl font-semibold flex gap-1">
              <ScanFace />
              Sign up to GenOps
            </h2>
            <h3 className="text text-slate-500 mb-4">Create your account and start your journey</h3>
            </div>
        </CardHeader>
        <SignupForm />
      </Card>
    </div>
  );
};

export default Page;

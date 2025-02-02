import { SingInForm } from "./signin-form";

const Page = () => {
  return (
    <div className="flex flex-col h-[100vh] overflow-hidden">
      <div className="flex flex-col w-full items-center sm:items-end justify-center h-full">
        <div className="flex flex-col w-full sm:w-[500px] items-center">
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
        <SingInForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
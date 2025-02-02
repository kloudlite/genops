import { SignupForm } from "./singup-form";

const Page = () => {
  return (
    <div className="flex flex-col h-[100vh]">
      <div className="flex flex-col w-full items-center justify-center h-full">
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
        <SignupForm />
      </div>
    </div>
  );
};

export default Page;

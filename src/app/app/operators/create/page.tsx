"use server"
import CreateOperator from "./create-button";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <CreateOperator />
    </div>
  );
};

export default Page;

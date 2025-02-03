"use server"
import CardsList from "./operator-cards";

const Page = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <h1 className="text-3xl font-bold p-4">Home</h1>
      <h1 className="text-2xl font-bold p-4">Operators</h1>
      <div className="flex w-full overflow-auto">
      <CardsList />
      </div>
    </div>
  );
}

export default Page;
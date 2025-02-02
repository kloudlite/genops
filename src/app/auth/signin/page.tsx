const Page = () => {
  return (
    <div className="flex flex-col h-[100vh]">
      <div className="flex flex-col w-full items-center justify-center h-full">
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>

        <form className="flex flex-col p-4">
          <input
            type="name"
            placeholder="Name"
            className=""
          />
          <input
            type="email"
            placeholder="Email"
            className=""
          />
          <input
            type="password"
            placeholder="Password"

          />

          <button className="">
            Sign In
          </button>
        </form>

        
      </div>
    </div>
  );
};

export default Page;

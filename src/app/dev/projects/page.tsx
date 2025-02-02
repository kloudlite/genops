const Page = () => {
  return (
    <div className="flex flex-col min-h-screen p-6">
      {/* Header */}
      <h1 className="text-3xl font-semibold mb-6">Projects</h1>

      {/* Project Cards Container */}
      <div className="flex flex-wrap gap-6">
        {/* Project Card 1 */}
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Project Title</h2>
          <a
            href="#"
            className="text-blue-500 hover:underline mb-2 block"
          >
            Source Link
          </a>
          <p className="text-gray-500">Date: 2025-02-02</p>
        </div>



        {/* More project cards can be added here */}
      </div>

      {/* Users Button at the Bottom Right */}
      <div className="absolute bottom-6 right-6">
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
          Users
        </button>
      </div>
    </div>
  );
};

export default Page;

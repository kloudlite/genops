const Page = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="header">
        Chat
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Messages will go here */}
        <h1>message will go here</h1>
      </div>

      {/* Message Input */}
      <div className="flex items-center gap-2 p-4 border-t bg-white">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button className="p-2 bg-blue-300">
          Send
        </button>
      </div>
    </div>
  );
}

export default Page;
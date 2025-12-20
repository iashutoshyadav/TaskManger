import { useEffect, useState } from "react";
import { getSocket, connectSocket, disconnectSocket } from "@/lib/socket";

type Message = {
  id: string;
  text: string;
  sender: "me" | "other";
  time: string;
};

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // 🔌 Connect socket
    connectSocket();
    const socket = getSocket();

    const handleReceive = (msg: Message) => {
      setMessages(prev => [...prev, msg]);
    };

    socket.on("chat:receive", handleReceive);

    return () => {
      socket.off("chat:receive", handleReceive);
      disconnectSocket();
    };
  }, []);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    const socket = getSocket();

    const msg: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    socket.emit("chat:message", msg);
    setMessage("");
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-2xl p-6">
      {/* Header */}
      <div className="border-b pb-4 mb-4">
        <h1 className="text-xl font-bold">Chat</h1>
        <p className="text-sm text-gray-500">
          Real-time collaboration
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-xl text-sm ${
                msg.sender === "me"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <p>{msg.text}</p>
              <span className="block text-[10px] mt-1 opacity-70 text-right">
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="flex gap-3 mt-4">
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-lg px-4 py-2"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </form>
    </div>
  );
}

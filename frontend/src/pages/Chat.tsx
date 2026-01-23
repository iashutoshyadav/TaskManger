import { useEffect, useState, useRef } from "react";
import { getSocket, connectSocket, disconnectSocket } from "@/lib/socket";
import { Send, Bot, User, Sparkles } from "lucide-react";

type Message = {
  id: string;
  text: string;
  sender: "me" | "other";
  time: string;
};

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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
    <div className="h-[calc(100vh-160px)] flex flex-col glass-card border-none bg-white p-0 overflow-hidden animate-in fade-in zoom-in-95 duration-500">
      {/* Header */}
      <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-brand flex items-center justify-center text-white shadow-lg shadow-brand/20">
            <Bot size={20} />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-800 flex items-center gap-2">
              AI Assistant
              <span className="flex items-center gap-1 text-[10px] bg-accent-light/20 text-accent-dark px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
                <Sparkles size={10} />
                Pro
              </span>
            </h1>
            <p className="text-xs font-medium text-slate-400">
              Active and ready to help
            </p>
          </div>
        </div>
        <div className="flex -space-x-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 ring-1 ring-slate-100" />
          ))}
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide bg-[#FDFDFD]"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
            <Bot size={48} className="text-brand" />
            <div>
              <p className="font-bold text-slate-800">No messages yet</p>
              <p className="text-sm font-medium">Ask me anything about your project.</p>
            </div>
          </div>
        )}

        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-end gap-3 ${msg.sender === "me" ? "flex-row-reverse" : "flex-row"
              }`}
          >
            <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${msg.sender === 'me' ? 'bg-brand text-white' : 'bg-white border border-slate-200 text-slate-400'
              }`}>
              {msg.sender === 'me' ? <User size={14} /> : <Bot size={14} />}
            </div>

            <div
              className={`max-w-[70%] px-5 py-3 rounded-2xl text-sm font-medium leading-relaxed ${msg.sender === "me"
                  ? "bg-brand text-white rounded-br-none shadow-lg shadow-brand/10"
                  : "bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm"
                }`}
            >
              <p>{msg.text}</p>
              <span className={`block text-[10px] mt-2 font-bold uppercase tracking-widest opacity-50 ${msg.sender === 'me' ? 'text-right' : 'text-left'
                }`}>
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-6 bg-white border-t border-slate-100">
        <form onSubmit={sendMessage} className="relative flex items-center gap-3">
          <input
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 transition-all pr-16"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="absolute right-2 h-11 w-11 bg-brand text-white rounded-xl flex items-center justify-center shadow-lg shadow-brand/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
          >
            <Send size={18} />
          </button>
        </form>
        <p className="text-[10px] text-center text-slate-400 mt-4 font-bold uppercase tracking-widest">
          AI may provide inaccurate information. Use with caution.
        </p>
      </div>
    </div>
  );
}

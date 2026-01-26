import { useEffect, useState, useRef } from "react";
import { getSocket, connectSocket, disconnectSocket } from "@/lib/socket";
import { Send, Users, MessageSquare } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useMessages } from "@/hooks/useMessages";

export default function Chat() {
  const [message, setMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth({ enabled: true });
  const { messages, isLoading } = useMessages();

  useEffect(() => {
    connectSocket();
    return () => {
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

    // The backend expects just the text, it knows who we are from the socket auth
    socket.emit("chat:message", { text: message });
    setMessage("");
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col glass-card border-none bg-white p-0 overflow-hidden animate-in fade-in zoom-in-95 duration-500">
      {/* Header */}
      <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-violet-600 flex items-center justify-center text-white shadow-lg shadow-violet-200">
            <Users size={20} />
          </div>
          <div>
            <h1 className="text-base font-black text-slate-800 flex items-center gap-2">
              Team Chat
              <span className="flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest border border-emerald-100">
                Live
              </span>
            </h1>
            <p className="text-xs font-semibold text-slate-400">
              Collaborate in real-time
            </p>
          </div>
        </div>
        <div className="flex -space-x-2">
          <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
            +
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide bg-[#FDFDFD]"
      >
        {isLoading ? (
          <div className="h-full flex items-center justify-center text-slate-400 animate-pulse">
            Loading conversation...
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
            <MessageSquare size={48} className="text-slate-300" />
            <div>
              <p className="font-bold text-slate-800">No messages yet</p>
              <p className="text-sm font-medium text-slate-500">Kick off the discussion!</p>
            </div>
          </div>
        ) : (
          messages.map(msg => {
            const isMe = msg.senderId._id === user?.id;
            return (
              <div
                key={msg._id}
                className={`flex items-end gap-3 ${isMe ? "flex-row-reverse" : "flex-row"}`}
              >
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm font-bold text-[10px] ${isMe ? 'bg-violet-600 text-white' : 'bg-white border border-slate-200 text-slate-400'}`}>
                  {isMe ? 'YOU' : msg.senderId.name?.substring(0, 2).toUpperCase() || '??'}
                </div>

                <div
                  className={`max-w-[70%] px-5 py-3 rounded-2xl text-sm font-medium leading-relaxed ${isMe
                    ? "bg-violet-600 text-white rounded-br-none shadow-lg shadow-violet-100"
                    : "bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm"
                    }`}
                >
                  {!isMe && (
                    <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                      {msg.senderId.name}
                    </span>
                  )}
                  <p>{msg.content}</p>
                  <span className={`block text-[10px] mt-2 font-bold uppercase tracking-widest opacity-50 ${isMe ? 'text-right' : 'text-left'}`}>
                    {formatTime(msg.createdAt)}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Input */}
      <div className="p-6 bg-white border-t border-slate-100">
        <form onSubmit={sendMessage} className="relative flex items-center gap-3">
          <input
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-50 transition-all pr-16"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="absolute right-2 h-11 w-11 bg-violet-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-violet-200 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

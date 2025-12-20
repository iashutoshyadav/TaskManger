import { io, Socket } from "socket.io-client";
const SOCKET_URL = import.meta.env.VITE_API_BASE_URL;

let socket: Socket | null = null;
export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      withCredentials: true,     // 🔥 SEND COOKIES
      transports: ["websocket"],
      autoConnect: false,

      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }
  return socket;
};

export const connectSocket = () => {
  const socketInstance = getSocket();

  if (!socketInstance.connected) {
    socketInstance.connect();
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

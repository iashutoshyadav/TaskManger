import { io, Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

let socket: Socket | null = null;

const getAuthToken = () => {
  return localStorage.getItem("accessToken");
};

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["polling", "websocket"],

      autoConnect: false,

      auth: {
        token: getAuthToken(),
      },

      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }
  return socket;
};

export const connectSocket = () => {
  const socketInstance = getSocket();
  socketInstance.auth = {
    token: getAuthToken(),
  };

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

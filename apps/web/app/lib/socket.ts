import { io, Socket } from "socket.io-client";

const URL = process.env.SOCKET_PUBLIC_API_URL;

export const socket: Socket = io(URL!, {
  withCredentials: true,
  autoConnect: false,
});

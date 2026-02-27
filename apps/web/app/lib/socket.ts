import { io, Socket } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_SOCKET_URL;
console.log("Socket URL:", URL);
export const socket: Socket = io(URL!, {
  withCredentials: true,
  autoConnect: false,
});

import socketAuth from "./middleware/io.Auth";
import { registerRoomChat } from "./routes/room/roomChat";
import { registerDirectChat } from "./routes/dm";
import { Server } from "socket.io";
import type { Server as HTTPServer } from "http";

export function createIO(httpServer: HTTPServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: true,
      credentials: true,
    },
  });
  io.use(socketAuth);
  io.on("connection", (socket) => {
    console.log("socket connected :", socket.id);
    const user = (socket.request as any).user;

    socket.join(`user:${user.id}`);

    registerRoomChat(io, socket);
    registerDirectChat(io, socket);

    socket.on("disconnect", () => {
      console.log("socket disconnected :", socket.id);
    });
  });

  return io;
}

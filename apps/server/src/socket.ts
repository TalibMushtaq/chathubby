import { Server } from "socket.io";
import type { Server as HTTPServer } from "http";

export function createIO(httpServer: HTTPServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: true,
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    console.log("socket connected :", socket.id);
    socket.on("disconnect", () => {
      console.log("socket disconnected :", socket.id);
    });

    socket.on("directChat: join", ({ directChatId }) => {
      socket.join(`directChatId:${directChatId}`);
    });

    socket.on("chatRoom:join", ({ chatRoomId }) => {
      socket.join(`chatroom:${chatRoomId}`);
    });
  });

  return io;
}

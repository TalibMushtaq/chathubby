import socketAuth from "./middleware/io.Auth";
import {
  assertDirectChatAccess,
  assertRoomAccess,
} from "./middleware/socketAccess";
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
    socket.on("disconnect", () => {
      console.log("socket disconnected :", socket.id);
    });

    socket.on("directChat:join", async ({ directChatId }) => {
      try {
        const user = (socket.request as any).user;

        if (typeof directChatId !== "string") {
          throw new Error("Invalid chat id");
        }
        await assertDirectChatAccess(user.id, directChatId);

        socket.join(`direct:${directChatId}`);
        socket.emit("directChat:joined", { directChatId });
      } catch (err: any) {
        socket.emit("error", err.message);
      }
    });

    socket.on("chatRoom:join", async ({ chatRoomId }) => {
      try {
        const user = (socket.request as any).user;

        if (typeof chatRoomId !== "string") {
          throw new Error("Invalid room id");
        }
        await assertRoomAccess(user.id, chatRoomId);

        socket.join(`room:${chatRoomId}`);
        socket.emit("chatRoom:joined", { chatRoomId });
      } catch (err: any) {
        socket.emit("error", err.message);
      }
    });
  });

  return io;
}

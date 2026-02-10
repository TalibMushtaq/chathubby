import type { User } from "@prisma/client";
import type { Server as IOServer } from "socket.io";

declare global {
  namespace Express {
    interface Request {
      user: Pick<User, "id" | "email" | "username" | "avatar" | "createdAt">;
      io: IOServer;
    }
  }
}

export {};

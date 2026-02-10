import type { User } from "@prisma/client";
import type { Server as IOServer } from "socket.io";

type AuthUser = Pick<
  User,
  "id" | "email" | "username" | "avatar" | "createdAt"
>;

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser; // make optional for TS safety
      io: IOServer;
    }
  }
}

export {};

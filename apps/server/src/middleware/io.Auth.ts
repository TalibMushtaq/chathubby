import type { Server, Socket } from "socket.io";
import { prisma } from "../../db/prisma";

export default async function socketAuth(
  socket: Socket,
  next: (err?: Error) => void,
) {
  try {
    const req = socket.request as any;
    if (!req.session || !req.session.userId) {
      return next(new Error("Unauthorized"));
    }

    const user = await prisma.user.findUnique({
      where: { id: req.session.userId },
      select: { id: true, username: true },
    });

    if (!user) return next(new Error("Unauthorized"));

    req.user = user;

    next(undefined);
  } catch (err) {
    next(new Error("Authentication Failed"));
  }
}

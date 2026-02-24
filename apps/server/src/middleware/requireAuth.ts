import type { Request, Response, NextFunction } from "express";
import { prisma } from "../../db/prisma";

const CACHE_TTL_MS = 1000 * 60 * 5; // 5 minutes

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ ok: false, error: "user not logged in" });
    }

    //------------------------- Fast path: session cache -------------------------------

    const cached = req.session.userCache as
      | { user: any; cachedAt: number }
      | undefined;

    if (
      cached?.user?.id === userId &&
      typeof cached.cachedAt === "number" &&
      Date.now() - cached.cachedAt < CACHE_TTL_MS
    ) {
      req.user = cached.user;
      return next();
    }

    // -------------------------- Slow path: DB fetch ---------------------------------

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        displayname: true,
        avatar: true,
        createdAt: true,
      },
    });

    if (!user) {
      req.session.destroy(() => {});
      return res.status(401).json({ ok: false, error: "user does not exist" });
    }

    // ----------------------- Store snapshot in session -------------------------------

    req.session.userCache = {
      user,
      cachedAt: Date.now(),
    };

    req.user = user;
    return next();
  } catch (err) {
    console.log(err, "auth middleware");
    return res.status(500).json({ ok: false, error: "server error" });
  }
};

export default requireAuth;

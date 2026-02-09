import type { Request, Response, NextFunction } from "express";
import { prisma } from "../../db/prisma";

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userid = req.session.userId;

    if (!userid)
      return res.status(403).json({ ok: false, error: "user not logged in" });

    const user = await prisma.user.findUnique({
      where: { id: userid },
      select: {
        id: true,
        username: true,
        avatar: true,
      },
    });

    if (!user) {
      req.session.destroy(() => {});
      return res.status(401).json({ ok: false, error: "user does not exitst" });
    }
    req.user = user;
    next();
  } catch (err: any) {
    console.log(err, "auth middleware");
    return res.status(500).json({ ok: false, error: "server error" });
  }
};

export default requireAuth;

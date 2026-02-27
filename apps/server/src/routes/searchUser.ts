import { Router, Request, Response } from "express";
import { prisma } from "../../db/prisma";
import requireAuth from "../middleware/requireAuth";

const router = Router();

router.get("/users", requireAuth, async (req: Request, res: Response) => {
  try {
    const query = (req.query.query as string)?.trim();
    if (!query || query.length < 2)
      return res.status(400).json({ ok: true, users: [] });

    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: query,
          mode: "insensitive",
        },
        NOT: {
          id: req.user!.id,
        },
      },
      select: {
        id: true,
        username: true,
        displayname: true,
      },
      take: 10,
    });
    return res.status(200).json({ ok: true, users });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ ok: false, error: "Server Error" });
  }
});

export default router;

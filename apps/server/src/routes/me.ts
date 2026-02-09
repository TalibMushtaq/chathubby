import { Request, Response } from "express";
import express from "express";
import { prisma } from "../../db/prisma";

const router = express.Router();

router.get("/me", async (req: Request, res: Response) => {
  try {
    const userid = req.session.userId;

    if (!userid)
      return res.status(401).json({ ok: false, error: "Not logged in " });

    const user = await prisma.user.findUnique({
      where: { id: userid },
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        createdAt: true,
      },
    });

    if (!user) {
      req.session.destroy(() => {});
      return res.status(401).json({ ok: false, error: "Session expired" });
    }
    return res.json({ ok: true, user });
  } catch (err: any) {
    console.log(err, "/me end point");
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

export default router;

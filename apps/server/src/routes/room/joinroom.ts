import { Router, Request, Response, response } from "express";
import requireAuth from "../../middleware/requireAuth";
import { prisma } from "../../../db/prisma";
import crypto from "crypto";

const router = Router();

router.post(
  "/:roomId/join-links",
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const myId = req.user!.id;
      const roomid = String(req.params.roomId);

      const room = await prisma.chatRoom.findUnique({
        where: {
          id: roomid,
        },
        select: {
          id: true,
        },
      });

      if (!room)
        return res.status(404).json({ ok: false, error: "Room not found" });

      const isMember = await prisma.chatRoomMember.findUnique({
        where: {
          userId_chatRoomId: {
            userId: myId,
            chatRoomId: roomid,
          },
        },
        select: {
          role: true,
        },
      });

      if (!isMember || (isMember.role !== "ADMIN" && isMember.role !== "OWNER"))
        return res
          .status(403)
          .json({ ok: false, error: "Not a member or Does not have access" });

      const token = crypto.randomBytes(12).toString("hex");

      const link = await prisma.roomJoinLink.create({
        data: {
          token: token,
          room: {
            connect: { id: roomid },
          },
          createdBy: {
            connect: { id: myId },
          },
        },
        select: {
          id: true,
          token: true,
          maxUses: true,
          expiresAt: true,
        },
      });

      return res.status(201).json({
        ok: true,
        link: {
          id: link.id,
          token: link.token,
          maxUses: link.maxUses,
          expiresAt: link.expiresAt,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        error: "Server error",
      });
    }
  },
);

router.get("/join/:token", requireAuth, async (req: Request, res: Response) => {
  try {
    const token = String(req.params.token);
    const link = await prisma.roomJoinLink.findUnique({
      where: { token: token },
      select: {
        token: true,
        isActive: true,
        usedCount: true,
        expiresAt: true,
        maxUses: true,
        room: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });
    const now = new Date();
    if (!link)
      return res
        .status(404)
        .json({ ok: false, error: "link does not exist or is deleted" });
    if (!link.isActive)
      return res.status(410).json({ ok: false, error: "link is not usable" });
    if (link.maxUses !== null && link.usedCount >= link.maxUses)
      return res.status(410).json({ ok: false, error: "max uses reached" });
    if (link.expiresAt && link.expiresAt < now)
      return res.status(410).json({ ok: false, error: "link expired" });

    return res.status(200).json({
      ok: true,
      room: link.room,
      expiresAt: link.expiresAt,
      maxUses: link.maxUses,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

import { Router, Request, Response, response } from "express";
import requireAuth from "../../middleware/requireAuth";
import { prisma } from "../../../db/prisma";
import crypto from "crypto";

const router = Router();

//------------------------------------ Crate Room Join Link --------------------------------------------
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
//-----------------------------validate token / Room status -----------------------------
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

// ----------------------Join Room-------------------------------------
router.post(
  "/join/:token",
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const userId = req.user!.id;
      const token = String(req.params.token);

      await prisma.$transaction(async (tx) => {
        const link = await tx.roomJoinLink.findUnique({
          where: { token },
        });

        if (!link) {
          throw new Error("NOT_FOUND");
        }

        const now = new Date();

        if (!link.isActive) {
          throw new Error("INACTIVE");
        }

        if (link.expiresAt && link.expiresAt < now) {
          throw new Error("EXPIRED");
        }

        if (link.maxUses !== null && link.usedCount >= link.maxUses) {
          throw new Error("MAX_USES");
        }

        const member = await tx.chatRoomMember.findUnique({
          where: {
            userId_chatRoomId: {
              userId,
              chatRoomId: link.roomId,
            },
          },
        });

        if (member) {
          throw new Error("ALREADY_MEMBER");
        }

        await tx.chatRoomMember.create({
          data: {
            User: { connect: { id: userId } },
            ChatRoom: { connect: { id: link.roomId } },
            role: "MEMBER",
          },
        });

        await tx.roomJoinLink.update({
          where: { id: link.id },
          data: {
            usedCount: { increment: 1 },
          },
        });
      });

      return res.status(200).json({ ok: true });
    } catch (err) {
      if (err instanceof Error) {
        switch (err.message) {
          case "NOT_FOUND":
            return res.status(404).json({ ok: false, error: "Link not found" });
          case "INACTIVE":
          case "EXPIRED":
          case "MAX_USES":
            return res
              .status(410)
              .json({ ok: false, error: "Link is no longer valid" });
          case "ALREADY_MEMBER":
            return res
              .status(409)
              .json({ ok: false, error: "Already a member" });
        }
      }

      console.error(err);
      return res.status(500).json({ ok: false, error: "Server error" });
    }
  },
);

router.patch(
  "/:roomId/join-links/:linkId",
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const userId = req.user!.id;
      const roomId = String(req.params.roomId);
      const linkId = String(req.params.linkId);

      const membership = await prisma.chatRoomMember.findUnique({
        where: {
          userId_chatRoomId: {
            userId,
            chatRoomId: roomId,
          },
        },
        select: { role: true },
      });

      if (
        !membership ||
        (membership.role !== "OWNER" && membership.role !== "ADMIN")
      ) {
        return res.status(403).json({
          ok: false,
          error: "Not authorized",
        });
      }

      const link = await prisma.roomJoinLink.findUnique({
        where: { id: linkId },
        select: { id: true, roomId: true, isActive: true },
      });

      if (!link || link.roomId !== roomId) {
        return res.status(404).json({
          ok: false,
          error: "Link not found",
        });
      }

      await prisma.roomJoinLink.update({
        where: { id: linkId },
        data: { isActive: false },
      });

      return res.status(200).json({
        ok: true,
        message: "Link deactivated",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        ok: false,
        error: "Internal server error",
      });
    }
  },
);

//---------------------------retun crated links by user----------------------------

router.get(
  "/join-links/mine",
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const userId = req.user!.id;

      const links = await prisma.roomJoinLink.findMany({
        where: {
          createdById: userId,
        },
        select: {
          id: true,
          token: true,
          maxUses: true,
          usedCount: true,
          expiresAt: true,
          isActive: true,
          createdAt: true,
          room: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.status(200).json({
        ok: true,
        links,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        ok: false,
        error: "Internal server error",
      });
    }
  },
);

export default router;

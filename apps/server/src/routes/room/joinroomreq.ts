import { Router, Request, Response } from "express";
import { prisma } from "../../../db/prisma";
import requireAuth from "../../middleware/requireAuth";
import { error } from "node:console";

const router = Router();

class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

router.post(
  "/:roomId/invitations",
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const myId = req.user!.id;
      const roomId = String(req.params.roomId);
      const targetUser = String(req.body.targetUserId);

      const userExists = await prisma.user.findUnique({
        where: {
          id: targetUser,
        },
        select: {
          id: true,
        },
      });
      const verify = await prisma.chatRoomMember.findUnique({
        where: {
          userId_chatRoomId: {
            userId: myId,
            chatRoomId: roomId,
          },
        },
        select: {
          role: true,
        },
      });

      if (!verify || (verify.role !== "ADMIN" && verify.role !== "OWNER"))
        return res.status(403).json({ ok: false, error: "Not authorized" });

      if (!userExists)
        return res
          .status(404)
          .json({ ok: false, error: "target user does not exist" });

      const isMember = await prisma.chatRoomMember.findUnique({
        where: {
          userId_chatRoomId: {
            userId: targetUser,
            chatRoomId: roomId,
          },
        },
        select: {
          joinedAt: true,
          role: true,
        },
      });

      if (isMember) {
        return res.status(409).json({
          ok: false,
          error: "Already a Member",
          role: isMember.role,
          joinedAt: isMember.joinedAt,
        });
      }

      const pending = await prisma.roomInvitation.findFirst({
        where: {
          roomId: roomId,
          invitedUserId: targetUser,
          status: "PENDING",
        },
        select: {
          id: true,
        },
      });

      if (pending) {
        return res.status(409).json({
          ok: false,
          error: "Invitation already sent",
          id: pending.id,
        });
      }
      const sent = await prisma.roomInvitation.create({
        data: {
          roomId: roomId,
          invitedUserId: targetUser,
          invitedById: myId,
        },
        select: {
          id: true,
          createdAt: true,
          status: true,
        },
      });

      return res.status(201).json({
        ok: true,
        id: sent.id,
        createdAt: sent.createdAt,
        status: sent.status,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ ok: false, error: "Server Error" });
    }
  },
);

router.get(
  "/invitation/sent",
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const myId = req.user!.id;
      const invitations = await prisma.roomInvitation.findMany({
        where: {
          invitedById: myId,
          status: "PENDING",
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          status: true,
          createdAt: true,
          room: {
            select: {
              id: true,
              name: true,
            },
          },
          invitedUser: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      });

      return res.status(200).json({ ok: true, invitations });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ ok: true, error: "Server Error" });
    }
  },
);

router.get(
  "/invitation/received",
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const myId = req.user!.id;

      const invitations = await prisma.roomInvitation.findMany({
        where: {
          invitedUserId: myId,
          status: "PENDING",
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          createdAt: true,
          room: {
            select: {
              id: true,
              name: true,
            },
          },
          invitedBy: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      });

      return res.status(200).json({
        ok: true,
        invitations,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ ok: false, error: "Server Error" });
    }
  },
);

router.patch(
  "/invitations/:invitationId",
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const myId = req.user!.id;
      const invitationId = String(req.params.invitationId);
      const status = req.body.status;

      if (status !== "ACCEPTED" && status !== "REJECTED") {
        return res.status(400).json({
          ok: false,
          error: "Invalid status value",
        });
      }

      if (status === "REJECTED") {
        const result = await prisma.roomInvitation.updateMany({
          where: {
            id: invitationId,
            invitedUserId: myId,
            status: "PENDING",
          },
          data: {
            status: "REJECTED",
          },
        });

        if (result.count === 0) {
          return res.status(409).json({
            ok: false,
            error: "Invitation not found or already processed",
          });
        }

        return res.status(200).json({ ok: true, status: "REJECTED" });
      }

      if (status === "ACCEPTED") {
        await prisma.$transaction(async (tx) => {
          const invitation = await tx.roomInvitation.findUnique({
            where: { id: invitationId },
            select: {
              id: true,
              roomId: true,
              invitedUserId: true,
              status: true,
            },
          });

          if (!invitation) throw new AppError("Invitation not found", 404);

          if (invitation.invitedUserId !== myId)
            throw new AppError("Not authorized", 403);

          if (invitation.status !== "PENDING")
            throw new AppError("Invitation already processed", 409);

          await tx.roomInvitation.update({
            where: { id: invitationId },
            data: { status: "ACCEPTED" },
          });

          await tx.chatRoomMember.create({
            data: {
              userId: myId,
              chatRoomId: invitation.roomId,
              role: "MEMBER",
            },
          });
        });

        return res.status(200).json({
          ok: true,
          status: "ACCEPTED",
        });
      }
    } catch (err: any) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({
          ok: false,
          error: err.message,
        });
      }

      if (err?.code === "P2002") {
        return res.status(409).json({
          ok: false,
          error: "User is already a member",
        });
      }

      console.error(err);
      return res.status(500).json({
        ok: false,
        error: "Server error",
      });
    }
  },
);

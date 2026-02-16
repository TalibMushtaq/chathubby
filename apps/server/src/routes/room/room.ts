import { Router, Request, Response } from "express";
import requireAuth from "../../middleware/requireAuth";
import { prisma } from "../../../db/prisma";
import { error } from "node:console";
import { ok } from "node:assert";

const router = Router();

// --------------------------Create Room -------------------------
router.post("/room", requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const name = String(req.body.name ?? "").trim();
    const descriptionRaw = req.body.discription;

    if (!name) {
      return res.status(400).json({ ok: false, error: "name is required" });
    }
    const discription =
      typeof descriptionRaw === "string" ? descriptionRaw.trim() : null;

    const room = await prisma.chatRoom.create({
      data: {
        name,
        description: discription || null,
        User: { connect: { id: userId } },
        ChatRoomMember: {
          create: {
            userId,
            role: "OWNER",
          },
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdBy: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return res.status(201).json({ ok: true, room });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ ok: false, error: "server error" });
  }
});

//------------------------------------------ List My Rooms ---------------------------------------

router.get("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const rooms = await prisma.chatRoom.findMany({
      where: {
        ChatRoomMember: {
          some: {
            userId,
          },
        },
      },
      orderBy: [{ updatedAt: "desc" }],
      select: {
        id: true,
        name: true,
        description: true,
        createdBy: true,
        createdAt: true,
        updatedAt: true,
        ChatRoomMember: {
          select: {
            id: true,
            userId: true,
            role: true,
          },
        },
        Message: {
          orderBy: { createdAt: "desc" },
          take: 1,
          select: {
            id: true,
            content: true,
            messageType: true,
            createdAt: true,
            isDeleted: true,
          },
        },
      },
    });

    const inbox = rooms.map((room) => {
      const myMembership = room.ChatRoomMember.find((m) => m.userId === userId);

      return {
        roomId: room.id,
        name: room.name,
        description: room.description,
        createdBy: room.createdBy,
        createdAt: room.createdAt,
        updatedAt: room.updatedAt,
        myRole: myMembership?.role ?? "MEMBER",
        lastMessage: room.Message[0] ?? null,
        memberCount: room.ChatRoomMember.length,
      };
    });
    return res.json({ ok: true, rooms: inbox });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ ok: false, error: "server error" });
  }
});

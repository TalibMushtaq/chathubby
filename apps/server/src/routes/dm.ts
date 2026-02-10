import { Router, Request, Response } from "express";
import requireAuth from "../middleware/requireAuth";
import { prisma } from "../../db/prisma";

const router = Router();

router.post(
  "/start-dm/:userId",
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const myId = req.user!.id;
      const otherId = String(req.params.userId);
      if (!req.params.userId)
        return res
          .status(400)
          .json({ ok: false, error: "target userId not provided" });

      const user1Id = myId < otherId ? myId : otherId;
      const user2Id = myId < otherId ? otherId : myId;

      if (user1Id == user2Id)
        return res.status(400).json({ ok: false, error: "cannot DM yourself" });

      const targetUser = await prisma.user.findUnique({
        where: { id: user2Id },
        select: { id: true },
      });

      if (!targetUser)
        return res
          .status(404)
          .json({ ok: false, error: "target user not found " });

      const existing = await prisma.directChat.findUnique({
        where: {
          user1Id_user2Id: { user1Id, user2Id },
        },
        select: {
          id: true,
          user1Id: true,
          user2Id: true,
          createdAt: true,
        },
      });

      if (existing)
        return res
          .status(200)
          .json({ ok: true, chat: existing, created: false });

      const chat = await prisma.directChat.create({
        data: { user1Id, user2Id },
        select: {
          id: true,
          user1Id: true,
          user2Id: true,
          createdAt: true,
        },
      });
      return res.json({ ok: true, chat, created: true });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ ok: false, error: "Server error" });
    }
  },
);

// -------------------------------------Sending Message ---------------------------------------

router.post(
  "/:directChatId/message",
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      if (!req.user)
        return res.status(401).json({ ok: false, error: "unauthorized" });
      const senderId = req.user.id;
      const directChatId = String(req.params.directChatId);
      const { content } = req.body;
      if (typeof content !== "string")
        return res
          .status(400)
          .json({ ok: false, error: "content must be a string" });
      const text = content.trim();
      if (!text)
        return res
          .status(400)
          .json({ ok: false, error: "content cannot be empty" });

      if (!directChatId) {
        return res
          .status(400)
          .json({ ok: false, error: "directChatId missing" });
      }

      const chat = await prisma.directChat.findUnique({
        where: { id: directChatId },
        select: { id: true, user1Id: true, user2Id: true },
      });

      if (!chat) {
        return res.status(404).json({ ok: false, error: "chat not found" });
      }
      const isMember = chat.user1Id === senderId || chat.user2Id === senderId;

      if (!isMember)
        return res.status(403).json({ ok: false, error: "not a participant" });

      const message = await prisma.message.create({
        data: {
          content: text,
          senderId,
          directChatId,
          messageType: "text",
        },
        select: {
          id: true,
          content: true,
          senderId: true,
          directChatId: true,
          createdAt: true,
        },
      });
      await prisma.directChat.update({
        where: { id: directChatId },
        data: { lastMessageAt: message.createdAt },
      });
      req.io
        .to(`directChat:${directChatId}`)
        .emit("inbox:update", { directChatId });
      req.io.to(`directChat:${directChatId}`).emit("message:new", message);
      return res.status(201).json({ ok: true, message });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ ok: false, error: "server error" });
    }
  },
);

// -----------------------get messages ------------------------------------

router.get(
  "/:directChatId/messages",
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      if (!req.params.directChatId)
        return res.status(404).json({ ok: false, error: "chat not found" });
      const chatid = String(req.params.directChatId);
      const chat = await prisma.directChat.findUnique({
        where: { id: chatid },
        select: { user1Id: true, user2Id: true },
      });
      if (!chat)
        return res.status(404).json({ ok: false, error: "chat not found" });

      if (!req.user)
        return res.status(401).json({ ok: false, error: "unauthorized" });

      const userid = req.user.id;

      const isMember = chat?.user1Id === userid || chat?.user2Id === userid;

      if (!isMember)
        return res.status(403).json({ ok: false, error: "not a participant" });

      const messages = await prisma.message.findMany({
        where: { directChatId: chatid },
        orderBy: { createdAt: "asc" },
        take: 50,
        select: {
          id: true,
          content: true,
          senderId: true,
          directChatId: true,
          createdAt: true,
        },
      });
      return res.json({ ok: true, messages });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ ok: false, error: "server error" });
    }
  },
);
router.get("/inbox", requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const chats = await prisma.directChat.findMany({
      where: {
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
      orderBy: [{ lastMessageAt: "desc" }, { createdAt: "desc" }],
      select: {
        id: true,
        user1Id: true,
        user2Id: true,
        createdAt: true,

        User_DirectChat_user1IdToUser: {
          select: { id: true, username: true, avatar: true },
        },
        User_DirectChat_user2IdToUser: {
          select: { id: true, username: true, avatar: true },
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

    const inbox = chats.map((chat) => {
      const otherUser =
        chat.user1Id === userId
          ? chat.User_DirectChat_user2IdToUser
          : chat.User_DirectChat_user1IdToUser;
      return {
        directChatId: chat.id,
        otherUser,
        lastMessage: chat.Message[0] ?? null,
        createdAt: chat.createdAt,
      };
    });
    return res.json({ ok: true, inbox });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ ok: false, error: "server error" });
  }
});

router.delete(
  "/:messageId",
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const userid = req.user?.id;
      const messageId = String(req.params.messageId);

      const msg = await prisma.message.findUnique({
        where: { id: messageId },
        select: {
          id: true,
          senderId: true,
          directChatId: true,
          isDeleted: true,
        },
      });
      if (!msg) {
        return res.status(404).json({ ok: false, error: "Message not found" });
      }
      if (msg.senderId !== userid) {
        return res.status(403).json({ ok: false, error: "Not allowed" });
      }
      if (msg.isDeleted) {
        return res.status(400).json({ ok: false, error: "Alreadt deleted" });
      }
      const deleted = await prisma.message.update({
        where: { id: messageId },
        data: {
          isDeleted: true,
          deletedAt: new Date(),
          content: null, // add file removal later
        },
        select: {
          id: true,
          directChatId: true,
          deletedAt: true,
        },
      });
      if (deleted.directChatId) {
        req.io
          .to(`directChat:${deleted.directChatId}`)
          .emit("message:deleted", {
            messageId: deleted.id,
            directChatId: deleted.directChatId,
            deletedAt: deleted.deletedAt,
          });
      }

      return res.json({ ok: true });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ ok: false, error: "server error" });
    }
  },
);

router.patch(
  "/:messageId",
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;
      const messageId = String(req.params.messageId);
      const content = String(req.body.content ?? "").trim();

      if (!content) {
        return res.status(400).json({ ok: false, error: "Content required" });
      }
      const msg = await prisma.message.findUnique({
        where: { id: messageId },
        select: {
          id: true,
          senderId: true,
          directChatId: true,
          isDeleted: true,
        },
      });

      if (!msg || msg.isDeleted) {
        return res
          .status(404)
          .json({ ok: false, error: "message not found or already deleted" });
      }
      if (msg.senderId !== userId) {
        return res.status(403).json({ ok: false, error: "not allowed" });
      }

      const updated = await prisma.message.update({
        where: { id: messageId },
        data: {
          content,
          editedAt: new Date(),
        },
        select: {
          id: true,
          content: true,
          editedAt: true,
          directChatId: true,
        },
      });

      if (updated.directChatId) {
        req.io.to(`directChat:${updated.directChatId}`).emit("message:edited", {
          messageId: updated.id,
          directChatId: updated.directChatId,
          content: updated.content,
          editedAt: updated.editedAt,
        });
        req.io.to(`directChat:${updated.directChatId}`).emit("inbox:update", {
          directChatId: updated.directChatId,
        });
        return res.json({ ok: true, message: updated });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ ok: false, error: "server error" });
    }
  },
);

export default router;

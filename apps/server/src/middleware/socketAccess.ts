import { prisma } from "../../db/prisma";

export async function assertRoomAccess(userId: string, chatRoomId: string) {
  const membership = await prisma.chatRoomMember.findUnique({
    where: {
      userId_chatRoomId: {
        userId: userId,
        chatRoomId: chatRoomId,
      },
    },
    select: {
      id: true,
    },
  });
  if (!membership) {
    throw new Error("not authorized for this room");
  }
}

export async function assertDirectChatAccess(
  userId: string,
  directChatId: string,
) {
  const chat = await prisma.directChat.findFirst({
    where: {
      id: directChatId,
      OR: [{ user1Id: userId }, { user2Id: userId }],
    },
    select: { id: true },
  });

  if (!chat) {
    throw new Error("Not authorized for this chat");
  }
}

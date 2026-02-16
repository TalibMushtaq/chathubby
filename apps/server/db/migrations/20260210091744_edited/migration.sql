/*
  Warnings:

  - The `role` column on the `ChatRoomMember` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ChatRoomRole" AS ENUM ('OWNER', 'ADMIN', 'MEMBER');

-- AlterTable
ALTER TABLE "ChatRoomMember" DROP COLUMN "role",
ADD COLUMN     "role" "ChatRoomRole" NOT NULL DEFAULT 'MEMBER';

-- CreateIndex
CREATE INDEX "ChatRoomMember_chatRoomId_idx" ON "ChatRoomMember"("chatRoomId");

-- CreateIndex
CREATE INDEX "ChatRoomMember_userId_idx" ON "ChatRoomMember"("userId");

-- CreateIndex
CREATE INDEX "Message_chatRoomId_createdAt_idx" ON "Message"("chatRoomId", "createdAt");

-- CreateIndex
CREATE INDEX "Message_directChatId_createdAt_idx" ON "Message"("directChatId", "createdAt");

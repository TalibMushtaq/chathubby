/*
  Warnings:

  - You are about to drop the column `createdAT` on the `RoomInvitation` table. All the data in the column will be lost.
  - You are about to drop the column `roomid` on the `RoomInvitation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roomId,invitedUserId]` on the table `RoomInvitation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roomId` to the `RoomInvitation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RoomInvitation" DROP CONSTRAINT "RoomInvitation_roomid_fkey";

-- DropIndex
DROP INDEX "RoomInvitation_roomid_invitedUserId_key";

-- AlterTable
ALTER TABLE "RoomInvitation" DROP COLUMN "createdAT",
DROP COLUMN "roomid",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "roomId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RoomInvitation_roomId_invitedUserId_key" ON "RoomInvitation"("roomId", "invitedUserId");

-- AddForeignKey
ALTER TABLE "RoomInvitation" ADD CONSTRAINT "RoomInvitation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "ChatRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

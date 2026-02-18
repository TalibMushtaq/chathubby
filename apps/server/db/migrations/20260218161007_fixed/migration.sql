/*
  Warnings:

  - The values [REJECTED] on the enum `InvitationStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `expiresAt` on the `RoomInvitation` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InvitationStatus_new" AS ENUM ('PENDING', 'ACCEPTED', 'EXPIRED');
ALTER TABLE "public"."RoomInvitation" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "RoomInvitation" ALTER COLUMN "status" TYPE "InvitationStatus_new" USING ("status"::text::"InvitationStatus_new");
ALTER TYPE "InvitationStatus" RENAME TO "InvitationStatus_old";
ALTER TYPE "InvitationStatus_new" RENAME TO "InvitationStatus";
DROP TYPE "public"."InvitationStatus_old";
ALTER TABLE "RoomInvitation" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- DropIndex
DROP INDEX "RoomInvitation_roomId_invitedUserId_key";

-- AlterTable
ALTER TABLE "RoomInvitation" DROP COLUMN "expiresAt";

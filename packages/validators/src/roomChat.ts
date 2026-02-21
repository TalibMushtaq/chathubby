import { z } from "zod";

export const chatRoomMessageSchema = z.object({
  chatRoomId: z.string().min(1),
  type: z.literal("TEXT"),
  content: z.string().trim().min(1).max(5000),
});

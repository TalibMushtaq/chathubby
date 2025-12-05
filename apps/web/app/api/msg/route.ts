import { redis } from "@repo/cache";

export async function GET() {
  await redis.set("greeting", "Hello Talib!");
  const msg = await redis.get("greeting");

  return Response.json({ msg });
}

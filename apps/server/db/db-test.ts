import type { Express } from "express";
import type { RedisClientType } from "redis";
import type { PrismaClient } from "@prisma/client";

export function registerDbTestRoute(opts: {
  app: Express;
  redis: any;
  prisma: PrismaClient;
}) {
  const { app, redis, prisma } = opts;

  app.get("/db-test", async (req, res) => {
    try {
      // ---- Redis test ----
      const redisKey = `health:redis:${Date.now()}`;

      await redis.set(redisKey, "ok", { EX: 10 });
      const redisVal = await redis.get(redisKey);
      await redis.del(redisKey);

      if (redisVal !== "ok") {
        throw new Error("Redis SET/GET failed");
      }

      // ---- Prisma test ----
      const result = await prisma.$queryRaw<
        { now: Date }[]
      >`SELECT NOW() as now`;

      if (!result?.[0]?.now) {
        throw new Error("Prisma query failed");
      }

      res.json({
        ok: true,
        redis: { ok: true },
        prisma: { ok: true, now: result[0].now },
      });
    } catch (err: any) {
      res.status(500).json({
        ok: false,
        error: err?.message ?? "unknown error",
      });
    }
  });
}

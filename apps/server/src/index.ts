import "dotenv/config";
import express from "express";

import { connectRedis, redis } from "./lib/redis";
import { prisma } from "../db/prisma";
import { registerDbTestRoute } from "../db/db-test";

async function main() {
  const app = express();

  app.use(express.json());

  // Connect Redis before routes
  await connectRedis();

  // Register /db-test
  registerDbTestRoute({ app, redis, prisma });

  // Basic root route
  app.get("/", (req, res) => {
    res.send("ChatHub server running");
  });

  const port = Number(process.env.PORT || 4000);

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

main().catch((err) => {
  console.error(" Server failed to start:", err);
  process.exit(1);
});

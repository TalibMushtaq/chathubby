import "dotenv/config";
import express from "express";
import { connectRedis } from "./lib/redis";
import { prisma } from "../db/prisma";
import cors from "cors";
import { sessionMiddleware } from "./middleware/session";
import authRouter from "./routes/auth";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  }),
);

app.use(sessionMiddleware());
app.use("/auth", authRouter);

async function main() {
  await connectRedis();
  const sat2 = await prisma.$queryRaw`SELECT 1`;
  if (sat2) {
    console.log("postgres/prisma db connected");
  }
  app.get("/", (req, res) => {
    res.send("Chathub server running");
  });
  const port = Number(3000);

  app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
  });
}

main().catch((err) => {
  console.error("server failed to start : ", err);
  process.exit(1);
});

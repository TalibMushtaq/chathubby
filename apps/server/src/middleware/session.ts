import session from "express-session";
import { RedisStore } from "connect-redis";
import { redis } from "../lib/redis";

export const sessionMiddleware = session({
  name: "chathubby.sid",
  store: new RedisStore({ client: redis }),
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
});

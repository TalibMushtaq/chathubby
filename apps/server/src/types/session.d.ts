import "express-session";

declare module "express-session" {
  interface SessionData {
    userId?: string;

    userCache?: {
      user: {
        id: string;
        email: string;
        username: string;
        avatar: string | null;
        createdAt: Date;
      };
      cachedAt: number;
    };
  }
}

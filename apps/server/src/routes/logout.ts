import { Request, Response } from "express";
import express from "express";

const router = express.Router();

router.post("/logout", async (req: Request, res: Response) => {
  if (!req.session) return res.status(200).json({ ok: true });
  req.session.destroy((err) => {
    if (err) {
      console.error("logout error:", err);
      return res.status(500).json({ ok: false, error: "Failed to logout" });
    }
    res.clearCookie("chathubby.sid");

    return res.status(200).json({ ok: true });
  });
});

export default router;

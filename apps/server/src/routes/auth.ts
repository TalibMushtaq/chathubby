import express from "express";

import signupRouter from "./auth/signup";
import loginRouter from "./auth/login";
import logoutRouter from "./auth/logout";
import meRouter from "./auth/me";

const router = express.Router();

router.use(signupRouter);
router.use(loginRouter);
router.use(logoutRouter);
router.use(meRouter);

export default router;

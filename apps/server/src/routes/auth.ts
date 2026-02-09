import express from "express";

import signupRouter from "./signup";
//import loginRouter from "./login";
//import logoutRouter from "./logout";
//import meRouter from "./me";

const router = express.Router();

router.use(signupRouter);
//router.use(loginRouter);
//router.use(logoutRouter);
//router.use(meRouter);

export default router;

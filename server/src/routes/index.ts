import express from "express";
import userRouter from "./users";
import authRouter from "./auth";
import eventRouter from "./event";

const router = express.Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/event", eventRouter);

export default router;

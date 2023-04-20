import { Router } from "express";

import { createUser, updateUser, user } from "./userController";

export const userRouter = Router();

userRouter.get("/:userId", user);
userRouter.post("/", createUser);
userRouter.put("/", updateUser);

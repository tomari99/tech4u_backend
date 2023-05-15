import { Router } from "express";

import { createUser, removeUser, updateUser, user } from "./userController";

export const userRouter = Router();

userRouter.get("/:userId", user);
userRouter.put("/", updateUser);
userRouter.delete("/", removeUser);

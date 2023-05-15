import { Router } from "express";
import { getAllUser } from "./adminUsersControllers";

export const adminUsersRouter = Router();
adminUsersRouter.route("/").get(getAllUser);

import { Router } from "express";

import controllers from "./udemyController";

export const udemyRouter = Router();

// /api/users/udemy
udemyRouter.route("/").get(controllers.getAllUdemy);

udemyRouter.route("/:id").get(controllers.getOneUdemy);

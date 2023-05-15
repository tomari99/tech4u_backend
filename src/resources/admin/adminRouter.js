import { Router } from "express";
import { configureUpload } from "../../utils/fileUpload";
import { signup } from "../../utils/auth";

export const adminRouter = Router();
const destination = "./uploads/users";
const upload = configureUpload(destination);

adminRouter.route("/").post(upload.single("userPhoto"), signup);

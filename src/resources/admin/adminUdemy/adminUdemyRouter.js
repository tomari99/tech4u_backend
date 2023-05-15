import { Router } from "express";
import controllers from "../../udemy/udemyController";
import { configureUpload } from "../../../utils/fileUpload";

export const adminUdemy = Router();

const destination = "./uploads/courses/udemy";
const upload = configureUpload(destination);
adminUdemy
  .route("/")
  .get(controllers.getAllUdemy)
  .post(upload.single("coursePhoto"), controllers.createUdemy);

adminUdemy
  .route("/:id")
  .get(controllers.getOneUdemy)
  .delete(controllers.removeOneUdemy);

import { Router } from "express";
import controllers from "./courseController";
import { configureUpload } from "../../utils/fileUpload";

export const coursesRouter = Router();
const destination = "./uploads/courses";
const upload = configureUpload(destination);
// /api/courses
coursesRouter
  .route("/")
  .get(controllers.getAcceptedCourse)
  .post(upload.single("coursePhoto"), controllers.createOne);

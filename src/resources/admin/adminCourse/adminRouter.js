import { Router } from "express";
import controllers from "../../courses/courseController";
import { configureUpload } from "../../../utils/fileUpload";

export const adminCoursesRouter = Router();
const destination = "./uploads/courses";
const upload = configureUpload(destination);
adminCoursesRouter
  .route("/")
  .get(controllers.getMany)
  .post(upload.single("coursePhoto"), controllers.createOne);

adminCoursesRouter
  .route("/:id")
  .get(controllers.getOne)
  .patch(controllers.courseAccept)

  .delete(controllers.removeOne);

import { Router } from "express";
import controllers from "./courseController";

export const coursesRouter = Router();

// /api/courses
coursesRouter
  .route("/")
  .get(controllers.getAcceptedCourse)
  .post(controllers.createOne);
// coursesRouter.route("/").get((req, res) => {
//   res.send({ message: "get requested" });
// });

// /api/courses/:userId
// coursesRouter.route("/:userId").post(controllers.createOne);

// /api/courses/:id
// coursesRouter.route("/:id").get(controllers.getOne);
// .put(controllers.updateOne)
// .delete(controllers.removeOne);

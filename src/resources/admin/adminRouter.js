import { Router } from "express";
import controllers from "./adminCourseController";

export const adminCoursesRouter = Router();
adminCoursesRouter.route("/").get(controllers.getMany);

adminCoursesRouter
  .route("/:id")
  .get(controllers.getOne)
  .patch(controllers.courseAccept)
  // .patch((req, res) => {
  //   res.send({ message: "patched" });
  // })
  .delete(controllers.removeOne);

// adminCoursesRouter.route("/").get((req, res) => {
//   return res.send("get");
// });

// adminCoursesRouter
//   .route("/:id")
//   .get((req, res) => {
//     return res.send("specific id");
//   })
//   .patch((req, res) => {
//     return res.send("Patched");
//   });

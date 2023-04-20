import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { coursesRouter } from "./resources/courses/courseRouter";
import { connect } from "./utils/db";
import { userRouter } from "./resources/user/userRouter";
import { adminProtect, protect, signin, signup } from "./utils/auth";
import { adminCoursesRouter } from "./resources/admin/adminRouter";
const app = express();
app.use(cors());
app.use(json());
app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));
app.post("/signup", signup);
app.post("/signin", signin);

app.use("/api", protect);
app.use("/api/admin", adminProtect);
app.use("/api/courses", coursesRouter);
app.use("/api/users", userRouter);
app.use("/api/admin/courses", adminCoursesRouter);

const start = async () => {
  try {
    await connect();
    app.listen(5000, () => {
      console.log(`REST API on http://localhost:3000/api`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();

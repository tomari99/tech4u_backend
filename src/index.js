import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { coursesRouter } from "./resources/courses/courseRouter";
import { connect } from "./utils/db";
import { userRouter } from "./resources/user/userRouter";
import { adminProtect, protect, signin } from "./utils/auth";
import { adminCoursesRouter } from "./resources/admin/adminCourse/adminRouter";
import { configureUpload } from "./utils/fileUpload";
import { adminUsersRouter } from "./resources/admin/adminUser/adminUsersRouter";
import { udemyRouter } from "./resources/udemy/udemyRouter";
import { adminUdemy } from "./resources/admin/adminUdemy/adminUdemyRouter";
import { adminRouter } from "./resources/admin/adminRouter";

const app = express();

app.use("/uploads", express.static("uploads"));

app.use(cors());
app.use(json());
app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));

const destination = "./uploads/users";
const upload = configureUpload(destination);
app.use("/signup", adminRouter);
app.post("/signin", signin);

// app.use("/api/users", protect);
// app.use("/api/admin", adminProtect);

app.use("/api/courses", coursesRouter);
app.use("/api/users/udemy", udemyRouter);
app.use("/api/users", userRouter);
app.use("/api/admin/courses", adminCoursesRouter);
app.use("/api/admin/udemy", adminUdemy);
app.use("/api/admin/users", adminUsersRouter);
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connect();
    app.listen(port, () => {
      console.log(`REST API on http://localhost:${port}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();

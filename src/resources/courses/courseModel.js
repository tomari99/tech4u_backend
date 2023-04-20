import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    org: {
      type: String,
      required: true,
      trim: true,
    },
    coursePhoto: String,
    shortDesc: {
      type: String,
      required: true,
    },
    longDesc: String,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted"],
      default: "pending",
      lowercase: true,
    },
  },
  { timestamps: true }
);

// courseSchema.index({ name: 1, coursePhoto: 1 }, { unique: true });
export const Course = mongoose.model("course", courseSchema);

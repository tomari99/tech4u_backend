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
    coursePhoto: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },

    isUdemyDaily: {
      type: Boolean,
      default: false,
    },

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

    lecturer: String,
  },
  { timestamps: true }
);

// courseSchema.index({ name: 1, coursePhoto: 1 }, { unique: true });
export const Course = mongoose.model("course", courseSchema);

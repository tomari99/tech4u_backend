import mongoose from "mongoose";

export const connect = () => {
  return mongoose.connect(`mongodb://localhost:27017/tech4u`, {
    useNewUrlParser: true,
  });
};

import { User } from "./userModel";
import mongoose from "mongoose";
export const user = async (req, res) => {
  const userIdObject = new mongoose.Types.ObjectId(req.params.userId);

  try {
    const user = await User.findById(userIdObject);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(200).json({ data: user });
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
};
export const removeUser = async (req, res) => {
  try {
    const removeUser = await User.findByIdAndRemove(req.user._id);
    res.status(200).json({ data: removeUser });
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
};

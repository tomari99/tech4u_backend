import { User } from "../../user/userModel";

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password").lean().exec();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Bad Request" });
  }
};

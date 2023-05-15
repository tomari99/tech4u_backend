import mongoose, { model } from "mongoose";
import { User } from "../resources/user/userModel";

export const getOneUdemy = (model) => async (req, res) => {
  const objId = new mongoose.Types.ObjectId(req.params.id);

  if (!objId) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const doc = await model
      .findOne({ _id: objId, isUdemyDaily: true })
      .lean()
      .exec();

    if (!doc) {
      return res
        .status(404)
        .json({ message: "Can't found the document with that ID" });
    }

    return res.status(200).json({ data: doc });
  } catch (e) {
    return res.status(400).json({ message: "Bad Request" });
  }
};

const getAllUdemy = (model) => async (req, res) => {
  try {
    const docs = await model.find({ isUdemyDaily: true }).lean().exec();
    return res.status(200).json({ data: docs });
  } catch (error) {
    console.log(error);
    res.status(400);
    return res.status(400).end({ message: "Bad Request" });
  }
};

const createUdemy = (model) => async (req, res) => {
  const { fieldname, path } = req.file;
  const createdBy = req.user._id;
  const isAdmin = await User.find({ _id: createdBy, isAdmin: true });
  if (!isAdmin) return res.status(401).json({ error: "Unauthorized" });

  try {
    const doc = await model.create({
      createdBy,
      ...req.body,

      [fieldname]: path,
      isUdemyDaily: true,
      org: "udemy",
    });

    return res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    return res.status(400).end({ message: "Bad Request" });
  }
};

export const removeOneUdemy = (model) => async (req, res) => {
  const objId = new mongoose.Types.ObjectId(req.params.id);

  if (!objId) {
    return res.status(404).json({ error: "Invalid ID" });
  }
  try {
    const removed = await model.findOneAndRemove({
      _id: objId,
    });

    if (!removed) {
      return res.status(400).end();
    }

    return res.status(200).json({ data: removed });
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
};

export const udemyCrud = (model) => ({
  getOneUdemy: getOneUdemy(model),
  getAllUdemy: getAllUdemy(model),
  createUdemy: createUdemy(model),
  removeOneUdemy: removeOneUdemy(model),
});

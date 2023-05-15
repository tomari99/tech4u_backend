import mongoose, { model } from "mongoose";
import { User } from "../resources/user/userModel";

export const getOne = (model) => async (req, res) => {
  const objId = new mongoose.Types.ObjectId(req.params.id);

  if (!objId) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const doc = await model.findOne({ _id: objId }).lean().exec();

    if (!doc) {
      return res
        .status(404)
        .json({ message: "Can't found the document with that ID" });
    }

    return res.status(200).json({ data: doc });
  } catch (e) {
    return res.status(400).end({ message: "Bad Request" });
  }
};

export const getMany = (model) => async (req, res) => {
  try {
    // const docs = await model.find({ createdBy: req.user._id }).lean().exec();
    const docs = await model.find().lean().exec();

    return res.status(200).json({ data: docs });
  } catch (e) {
    return res.status(400).end({ message: "Bad Request" });
  }
};

export const getAcceptedCourse = (model) => async (req, res) => {
  try {
    const docs = await model
      .find({ status: "accepted" })
      .select("-__v")
      .lean()
      .exec();
    return res.status(200).json({ data: docs });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Bad Request" });
  }
};

export const createOne = (model) => async (req, res) => {
  // console.log(req.user._id);
  const createdBy = req.user._id;
  const { fieldname, path } = req.file;
  try {
    const doc = await model.create({
      ...req.body,
      createdBy,
      [fieldname]: path,
    });
    const userId = req.user._id;
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { courses: doc._id } },
      { new: true }
    );
    return res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    return res.status(400).end({ message: "Bad Request" });
  }
};

export const updateOne = (model) => async (req, res) => {
  const objId = new mongoose.Types.ObjectId(req.params.id);

  if (!objId) {
    return res.status(404).json({ error: "Invalid ID" });
  }
  try {
    const updatedDoc = await model
      .findOneAndUpdate(
        {
          _id: objId,
        },
        req.body,
        { new: true }
      )
      .lean()
      .exec();

    if (!updatedDoc) {
      return res.status(400).end({ message: "Bad Request" });
    }

    return res.status(200).json({ data: updatedDoc });
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
};

export const removeOne = (model) => async (req, res) => {
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

// admin course accept
export const courseAccept = (model) => async (req, res) => {
  const objId = new mongoose.Types.ObjectId(req.params.id);

  if (!objId) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const updatedDoc = await model.findOneAndUpdate(
      { _id: objId },
      { $set: { status: "accepted" } },
      { new: true }
    );
    if (!updatedDoc) {
      return res.status(404).end();
    }
    return res.status(200).json({ data: updatedDoc });
  } catch (error) {
    console.error(error);
    return res.status(400).end({ message: "Bad Request" });
  }
};

// get reported course and reported user

export const crudControllers = (model) => ({
  courseAccept: courseAccept(model),
  getAcceptedCourse: getAcceptedCourse(model),
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model),
});

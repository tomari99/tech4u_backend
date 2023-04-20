import mongoose, { model } from "mongoose";

export const getOne = (model) => async (req, res) => {
  const courseObjectId = new mongoose.Types.ObjectId(req.params.id);
  console.log(courseObjectId);
  try {
    const doc = await model.findOne({ _id: courseObjectId }).lean().exec();

    if (!doc) {
      return res.status(400).end();
    }

    return res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
};

export const getMany = (model) => async (req, res) => {
  try {
    // const docs = await model.find({ createdBy: req.user._id }).lean().exec();
    const docs = await model.find().lean().exec();

    return res.status(200).json({ data: docs });
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
};

export const getAcceptedCourse = (model) => async (req, res) => {
  try {
    const docs = await model.find({ status: "accepted" }).lean().exec();
    return res.status(200).json({ data: docs });
  } catch (error) {
    console.error(error);
    return res.status(400).end();
  }
};

// export const createOne = (model) => async (req, res) => {
//   const createdBy = req.user._id;
//   try {
//     const doc = await model.create({ ...req.body, createdBy });
//     res.status(201).json({ data: doc });
//   } catch (e) {
//     console.error(e);
//     res.status(400).end();
//   }
// };

// export const createOne = (model) => async (req, res) => {
//   const createdBy = mongoose.Types.ObjectId(req.params.userId);
//   try {
//     const doc = await model.create({ ...req.body, createdBy });
//     res.status(201).json({ data: doc });
//   } catch (e) {
//     console.error(e);
//     res.status(400).end();
//   }
// };

export const createOne = (model) => async (req, res) => {
  const createdBy = req.user._id;
  try {
    const doc = await model.create({ ...req.body, createdBy });
    return res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
};

export const updateOne = (model) => async (req, res) => {
  const courseObjectId = new mongoose.Types.ObjectId(req.params.id);
  try {
    const updatedDoc = await model
      .findOneAndUpdate(
        {
          _id: courseObjectId,
        },
        req.body,
        { new: true }
      )
      .lean()
      .exec();

    if (!updatedDoc) {
      return res.status(400).end();
    }

    return res.status(200).json({ data: updatedDoc });
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
};

export const removeOne = (model) => async (req, res) => {
  const courseObjectId = new mongoose.Types.ObjectId(req.params.id);
  try {
    const removed = await model.findOneAndRemove({
      _id: courseObjectId,
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
  const courseObjectId = new mongoose.Types.ObjectId(req.params.id);

  if (!courseObjectId) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const updatedDoc = await model.findOneAndUpdate(
      { _id: courseObjectId },
      { $set: { status: "accepted" } },
      { new: true }
    );
    if (!updatedDoc) {
      return res.status(404).end();
    }
    return res.status(200).json({ data: updatedDoc });
  } catch (error) {
    console.error(error);
    return res.status(400).end();
  }
};

export const crudControllers = (model) => ({
  courseAccept: courseAccept(model),
  getAcceptedCourse: getAcceptedCourse(model),
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model),
});

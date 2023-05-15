import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { User } from "../resources/user/userModel";
import nodemailer from "nodemailer";
dotenv.config();

// nodemailer
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_APP_PASSWORD,
  },
});

transporter.verify((err, success) => {
  if (err) console.log(err);
  console.log("Success:", success);
});

export const newToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.SECRET, {
    expiresIn: process.env.EXPIRED_IN,
  });
};

export const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

export const signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "need email and password" });
  }

  const existingUser = await User.find({ email: req.body.email });
  if (existingUser.length > 0) {
    return res
      .status(409)
      .json({ message: "User with that email already exists." });
  }
  if (req.file) {
    const { fieldname, path } = req.file;
    const user = await User.create({ ...req.body, [fieldname]: path });
    const token = newToken(user);
    return res.status(201).json({ token, statusCode: 201 });
  }
  // console.log({ ...req.body, path });

  try {
    const user = await User.create({ ...req.body });
    // const token = newToken(user);
    return res
      .status(201)
      .json({ statusCode: 201, message: "Created Successfully" });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "internal sever error , Can't sign up user right now" });
  }
};

export const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "need email and password" });
  }

  const invalid = { message: "Invalid email and passoword combination" };

  try {
    const user = await User.findOne({ email: req.body.email }).exec();

    if (!user) {
      return res.status(401).send(invalid);
    }

    const match = await user.checkPassword(req.body.password);

    if (!match) {
      return res.status(401).send(invalid);
    }

    const token = newToken(user);
    return res.status(200).json({ data: { user, token, statusCode: 200 } });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).end();
  }

  const token = bearer.split("Bearer ")[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).end();
  }

  const user = await User.findById(payload.id)
    .select("-password")
    .lean()
    .exec();

  if (!user) {
    return res.status(401).end();
  }

  req.user = user;
  next();
};

export const adminProtect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).end();
  }

  const token = bearer.split("Bearer ")[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).end();
  }

  const user = await User.findById(payload.id)
    .select("-password")
    .lean()
    .exec();

  if (!user) {
    return res.status(401).end();
  }

  req.user = user;

  if (req.user.isAdmin) {
    console.log("hi admin");
    return next();
  }

  return res.status(401).end();
};

import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import User from "../db/models/userModel.js";
import { tokenUpdate, updateImage } from "../services/userServices.js";
import HttpError from "../helpers/HttpError.js";

export const userSignup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw HttpError(409, "Email in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = {
      name,
      email,
      password: hashedPassword,
    };

    const user = await User.create(data);
    const newUser = await tokenUpdate(user);

    newUser.password = undefined;
    res.status(201).json(newUser);
  } catch (er) {
    next(er);
  }
};

export const userSignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) {
      throw HttpError(401, "Email or password is wrong");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      throw HttpError(401, "Email or password is wrong");
    }

    const user = await tokenUpdate(existingUser);
    user.password = undefined;
    res.json(user);
  } catch (er) {
    next(er);
  }
};

export const userLogout = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw HttpError(401, "Not authorized");
    }

    user.token = "";
    await user.save();

    res.status(204).end();
  } catch (er) {
    next(er);
  }
};

export const editUser = async (req, res, next) => {
  try {
    const userId = req.user;
    const { name, email, password } = req.body;
    const avatar = req.file;

    let user = await User.findById(userId);

    if (!user) {
      throw HttpError(404, "User not found");
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (avatar) {
      const result = await updateImage(avatar.path);
      user.avatarUrl = result;
    }

    await user.save();
    const updatedUser = await User.findByIdAndUpdate(userId, user, {
      new: true,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

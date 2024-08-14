import express from "express";
import validateBody from "../helpers/validateBody.js";
import {
  userRegistrationSchema,
  userUpdateSchema,
} from "../db/schemas/userSchemas.js";
import {
  userSignup,
  userSignIn,
  userLogout,
  editUser,
} from "../controllers/userControllers.js";
import { verifyToken } from "../midellwares/verifyToken.js";
import upload from "../midellwares/upload.js";

const userRouter = express.Router();

userRouter.post("/register", validateBody(userRegistrationSchema), userSignup);
userRouter.post("/login", validateBody(userRegistrationSchema), userSignIn);
userRouter.post("/logout", verifyToken, userLogout);
userRouter.patch(
  "/update",
  verifyToken,
  validateBody(userUpdateSchema),
  upload.single("avatar"),
  editUser
);
export default userRouter;

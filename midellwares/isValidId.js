import { isValidObjectId } from "mongoose";
import HttpError from "../helpers/HttpError.js";

export const checkIsValidId = (req, _, next) => {
  const { productId, categoryId} = req.params;

  const id = productId || categoryId;

  if (!isValidObjectId(id)) {
    return next(HttpError(400, `Requested id(${id}) is invalid`));
  }

  next();
};

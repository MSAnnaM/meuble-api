import express from "express";
import validateBody from "../helpers/validateBody.js";
import { checkIsValidId } from "../midellwares/isValidId.js";
import {
  productCreateSchema,
  productUpdateSchema,
} from "../db/schemas/productSchemas.js";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers.js";
import upload from "../midellwares/upload.js";

const productRouter = express.Router();

productRouter.post(
  "/create",
  // validateBody(productCreateSchema),
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  createProduct
);
productRouter.get("/", getAllProducts);
productRouter.patch(
  "/:productId",
  checkIsValidId,
  validateBody(productUpdateSchema),
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  updateProduct
);
productRouter.delete("/:productId", checkIsValidId, deleteProduct);
export default productRouter;

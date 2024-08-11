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


const productRouter = express.Router();

productRouter.post(
  "/create",
  validateBody(productCreateSchema),
  createProduct
);
productRouter.get("/", getAllProducts);
productRouter.patch(
  "/:productId",
  checkIsValidId,
  validateBody(productUpdateSchema),
  updateProduct
);
productRouter.delete("/:productId", checkIsValidId, deleteProduct);
export default productRouter;

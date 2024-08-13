import express from "express";
import validateBody from "../helpers/validateBody.js";
import { categoryCreateSchema, categoryUpdateSchema } from "../db/schemas/categorySchemas.js";
import {categoryCreate, getAllCategories, updateCategory, deleteCategory} from "../controllers/categoryControllers.js";
import { checkIsValidId } from "../midellwares/isValidId.js";

const categoryRouter = express.Router();

categoryRouter.post("/create", validateBody(categoryCreateSchema), categoryCreate);
categoryRouter.get("/", getAllCategories);
categoryRouter.patch("/:categoryId",checkIsValidId, validateBody(categoryUpdateSchema), updateCategory);
categoryRouter.delete("/:categoryId", checkIsValidId, deleteCategory);

export default categoryRouter;
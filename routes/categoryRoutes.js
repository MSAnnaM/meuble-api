import express from "express";
import validateBody from "../helpers/validateBody.js";
import { categoryCreateSchema } from "../db/schemas/categorySchemas.js";
import categoryCreate from "../controllers/categoryControllers.js";

const categoryRouter = express.Router();

categoryRouter.post("/create", validateBody(categoryCreateSchema), categoryCreate);

export default categoryRouter;
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import productRouter from "./routes/productRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";


const app = express();
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));

app.use("/api/category", productRouter);
app.use("/api/product", categoryRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});



export default app;
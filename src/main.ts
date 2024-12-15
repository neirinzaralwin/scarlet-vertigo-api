import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./api/routes/auth";
import productRoutes from "./api/routes/product";
import categoryRoutes from "./api/routes/category";
import sizeRoutes from "./api/routes/size";
import newsRoutes from "./api/routes/news";
import requestFormRoutes from "./api/routes/requestForm";
import cartRoutes from "./api/routes/cart";
import orderRoutes from "./api/routes/order";
import { specs, swaggerUi } from "../src/config/swagger";

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/sizes", sizeRoutes);
app.use("/api/v1/news", newsRoutes);
app.use("/api/v1/carts", cartRoutes);
app.use("api/v1/orders", orderRoutes);
app.use("/api/v1/requestForm", requestFormRoutes);
app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port ", process.env.PORT);
      console.log("Connected to MongoDB!!!");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

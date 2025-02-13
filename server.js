//5:37
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
//import { connectDB } from "./config/dbConnect.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";

import mongoose from "mongoose";

//! configure env
dotenv.config();

//! rest object
const app = express();

//! middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const url = `mongodb+srv://pujalahane2024:uXRflwkhAA58OYgC@cluster0.xiixj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://pujalahane2024:E8iaiZgVESaeoiu5@cluster0.ik7zs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("mongoDB connected successfully...");
  } catch (error) {
    console.log(error);
  }
};
connectDB();
//! routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//! rest api
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to ecommerce app...",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});

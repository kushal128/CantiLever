import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";

dotenv.config();

//db connection
connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to parse JSON bodies
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//routes
app.use("/api/v1/auth/", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
// rest apis
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

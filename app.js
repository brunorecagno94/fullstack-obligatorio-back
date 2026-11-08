import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./v1/config/db.config.js";
import { configurarCloudinary } from "./v1/config/cloudinary.js";
import routes from "./v1/v1.routes.js";
import notFoundMiddleware from "./v1/middlewares/notFound.middleware.js";
import errorMiddleware from "./v1/middlewares/error.middleware.js";

dotenv.config();
connectDB();
configurarCloudinary();
const app = express();
app.disable('x-powered-by');
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173", "https://fullstack-obligatorio-front.vercel.app"],
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});
app.use("/v1", routes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
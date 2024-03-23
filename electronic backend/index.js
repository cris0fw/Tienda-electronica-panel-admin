import express from "express";
const app = express();
const port = process.env.PORT || 4000;
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
// BASE DE DATOS
import connectDB from "./config/dbConnect.js";

// IMPORTACIONES DE RUTAS
import authUser from "./router/authRoute.js";
import productRouter from "./router/ProductRoute.js";
import blogRoute from "./router/blogRoute.js";
import categoryRoute from "./router/categoryRoute.js";
import categoryBlogRoute from "./router/categoryBlogRoute.js";
import brandRoute from "./router/brandRoute.js";
import couponRoute from "./router/couponRoute.js";
import colorRoute from "./router/colorRoute.js";
import equiryRoute from "./router/enqRoute.js";
import uploadRouter from "./router/uploadRoute.js";
import paymentRoute from "./router/paymentRoute.js";

import { NotFound, errorHandler } from "./middleware/ErrorHandler.js";

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());

// RUTAS
app.use("/api/user", authUser);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRoute);
app.use("/api/category", categoryRoute);
app.use("/api/categoryBlog", categoryBlogRoute);
app.use("/api/brand", brandRoute);
app.use("/api/coupon", couponRoute);
app.use("/api/color", colorRoute);
app.use("/api/equiry", equiryRoute);
app.use("/api/upload", uploadRouter);
app.use("/api/payment", paymentRoute);

app.use(NotFound);
app.use(errorHandler);

connectDB();
app.listen(port, () => {
  console.log(`Puerto funcionando en ${port} 😎 `);
});

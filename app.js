import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import cartRoute from "./routes/cartRoute.js";
import productRoute from "./routes/productRoute.js";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({
    path: "./config/.env",
});

connectDb();

const app = express();

//using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));
app.use(express.static("public"));

//using routes
app.use("/api", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/product", productRoute);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(
        `Server is working on port:${process.env.PORT} on ${process.env.NODE_ENV} mode`
    );
});

//using error middleware
app.use(errorMiddleware);

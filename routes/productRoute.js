import express from "express";
import { addProduct, getProduct } from "../controller/productController.js";
import { uploadMiddleware } from "../middlewares/upload.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post(
    "/add",
    isAuthenticated,
    isAdmin("admin"),
    uploadMiddleware.array("file"),
    addProduct
);
router.get("/", getProduct);

export default router;

import express from "express";
import {
    addProduct,
    getBrands,
    getCategories,
    getProduct,
    getProductById,
} from "../controller/productController.js";
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
router.get("/categories", getCategories);
router.get("/brands", getBrands);
router.get("/:id", getProductById);

export default router;

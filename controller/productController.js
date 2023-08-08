import { Product } from "../models/productModel.js";
import { customError } from "../utils/customClass.js";
import ProductFilter from "../utils/productFilters.js";

export const addProduct = async (req, res, next) => {
    try {
        const { title, description, price, discount, stock, brand, category } =
            JSON.parse(req.body.json);
        const images = req.files.map((file) => file.filename);
        const product = await Product.create({
            title,
            description,
            price,
            discountPercentage: discount,
            stock,
            brand,
            category,
            images,
            createdBy: req.user._id,
        });
        res.status(201).json({
            success: true,
            message: "Product added successfully",
            product,
        });
    } catch (error) {
        next(error);
    }
};

export const getProduct = async (req, res, next) => {
    try {
        //limiting product per page
        const limit = 9;
        //adding product filters
        const productFilters = new ProductFilter(
            Product.find(),
            Product.countDocuments(),
            req.query
        )
            .search()
            .filter()
            .pagination(limit);
        const products = await productFilters.method;
        const productCount = await productFilters.count;
        res.status(200).json({
            success: true,
            products,
            limit,
            productCount,
        });
    } catch (error) {
        next(error);
    }
};

export const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });
        if (product === null) {
            return next(new customError("Product not found", 404));
        }
        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        next(error);
    }
};

export const getCategories = async (req, res, next) => {
    try {
        const categories = await Product.distinct("category");
        res.status(200).json({
            success: true,
            categories,
        });
    } catch (error) {
        next(error);
    }
};

export const getBrands = async (req, res, next) => {
    try {
        const brands = await Product.distinct("brand");
        res.status(200).json({
            success: true,
            brands,
        });
    } catch (error) {
        next(error);
    }
};

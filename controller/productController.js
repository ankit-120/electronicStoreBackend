import { Product } from "../models/productModel.js";
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
        const resultPerPage = 2;
        //adding product filters
        const productFilters = new ProductFilter(Product.find(), req.query)
            .search()
            .filter()
            .pagination(resultPerPage);
        const products = await productFilters.method;
        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        next(error);
    }
};

import { Cart } from "../models/cartModel.js";

export const addToCart = async (req, res, next) => {
    try {
        const { product } = req.body;
        const cart = await Cart.findOne({ user: req.user })
        if (cart !== null) {
            cart.products.push(product);
            cart.totalPrice += product.price;
            await cart.save();
        } else {
            await Cart.create({
                products: [product],
                totalPrice: product.price,
                user: req.user
            });
        }

        res
            .status(200)
            .json({
                success: true,
                message: 'Item added to cart',
            })
    } catch (error) {
        console.log("cart error")
        next(error);
    }
}


export const mycart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user })
        if (cart === null) {
            return res
                .status(200)
                .json({
                    success: false,
                    message: "Cart is empty",
                    cart: []
                })
        } else {
            return res
                .status(200)
                .json({
                    success: true,
                    cart
                })
        }
    } catch (error) {
        next(error)
    }
}


export const deleteProduct = async (req, res, next) => {
    const cart = await Cart.findOne({ user: req.user });
    const prodIdx = req.params.id;
    cart.totalPrice -= cart.products[prodIdx].price;
    cart.products.splice(prodIdx, 1);
    await cart.save();
    res
        .status(200)
        .json({
            success: true,
            message: "Item removed from cart"
        });
}

export const updateCart = async (req, res, next) => {
    const cart = await Cart.findOne({ user: req.user });
    const { totalPrice } = req.body;
    cart.totalPrice = totalPrice;
    await cart.save();
    res
        .status(200)
        .json({
            success: true,
            message: "Item removed from cart"
        });
}

export const deleteAllProduct = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user });
    cart.products = [];
    await cart.save();
    res
        .status(200)
        .json({
            success: true,
            message: "All items removed",
        })
}
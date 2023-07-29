import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: {
        type: [],
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
})

export const Cart = mongoose.model('Cart', schema);
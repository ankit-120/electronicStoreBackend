import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (password) => {
                return password.length >= 4
            },
            message: "Password should be greater than 4 character length"
        },
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export const User = mongoose.model('User', schema);
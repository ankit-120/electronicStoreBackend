import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
    },
    email: {
        type: String,
        unique: [true, "Please provide email"],
        required: true
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        validate: {
            validator: (password) => {
                return password.length >= 4
            },
            message: "Password should be greater than 4 character length"
        },
        select: false
    },
    avatar:{
        type:String,
    },
    role:{
        type:String,
        default:'user'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export const User = mongoose.model('User', schema);
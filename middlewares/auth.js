import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { customError } from "../utils/customClass.js";

export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Login First",
        });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);

    req.user = await User.findById(decode._id);
    next();
};

export const userExist = async (req, res, next) => {
    console.log(req.body.json);
    next();
};

export const isAdmin = (role) => {
    return (req, res, next) => {
        if (role !== req.user.role) {
            return next(
                new customError(
                    `Role:'${req.user.role}' is not allowed to access this resource.`,
                    403
                )
            );
        }
        next();
    };
};

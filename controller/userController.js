import { User } from "../models/userModel.js";
import { customError } from "../utils/customClass.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";

export const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = JSON.parse(req.body.json);
        // console.log(JSON.parse(req.body.json));
        const avatar = req.file ? req.file.filename : "default_profile.png";
        let user = await User.findOne({ email });
        if (user) {
            return next(new customError("User already exists", 400));
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        user = await User.create({
            name,
            email,
            password: hashedPassword,
            avatar,
        });

        const token = jwt.sign(
            { _id: user._id, name: user.name },
            process.env.SECRET_KEY
        );

        res.status(201)
            .cookie("token", token, {
                httpOnly: true,
                maxAge: 15 * 60 * 1000,
                sameSite: "none",
                secure: true,
            })
            .json({
                success: true,
                message: "Registered Successfully",
                user,
            });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new customError("Invalid Username or Password", 400));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return next(new customError("Invalid Username or Password", 400));
    }

    const token = jwt.sign(
        { _id: user._id, name: user.email },
        process.env.SECRET_KEY
    );

    res.status(200)
        .cookie("token", token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            sameSite: "none",
            secure: true,
        })
        .json({
            success: true,
            message: "Login Successfull",
            user,
        });
};

export const getUserProfile = (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user,
        });
    } catch (error) {
        next(error);
    }
};

export const logout = (req, res) => {
    res.status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: "none",
            secure: true,
        })
        .json({
            success: true,
            message: "Logged out successfully",
        });
};

export const updateProfile = async (req, res, next) => {
    try {
        let newUserData = JSON.parse(req.body.json);
        // chehk if email already exists
        let user = await User.findOne({ email: newUserData.email });
        if (user) {
            //to delete the file uploaded
            fs.unlink(`./public/images/${req.file.filename}`, (err) => {
                if (err) {
                    console.error("Error deleting profile picture ", err);
                    // return next(err);
                } else {
                    console.log("Profile picture deleted successfully");
                }
            });
            return next(
                new customError("Email already exists. Choose another", 400)
            );
        }
        // check if avatar is also updated
        if (req.file) {
            newUserData = { ...newUserData, avatar: req.file.filename };
            //if the avatar is uploaded first time do not delete else delete
            if (req.user.avatar !== "default_profile.png") {
                fs.unlink(`./public/images/${req.user.avatar}`, (err) => {
                    if (err) {
                        console.error("Error deleting profile picture ", err);
                        // return next(err);
                    } else {
                        console.log("Profile picture deleted successfully");
                    }
                });
            }
        }
        //update user
        user = await User.findByIdAndUpdate(req.user._id, newUserData, {
            new: true,
        });

        //sending response
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

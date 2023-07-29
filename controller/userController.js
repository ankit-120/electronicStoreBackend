import { User } from '../models/userModel.js';
import { customError } from '../utils/customClass.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email })
        if (user) {
            return next(new customError('User already exists', 400));
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ _id: user._id, name: user.name }, process.env.SECRET_KEY);

        res
            .status(201)
            .cookie("token", token, {
                httpOnly: true,
                maxAge: 15 * 60 * 1000,
                sameSite: "none",
                secure: true
            })
            .json({
                success: true,
                message: 'Registered Successfully',
                user
            })
    } catch (error) {
        console.log("error")
        next(error);
    }
}

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new customError('Invalid Username or Password', 400));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return next(new customError('Invalid Username or Password', 400));
    }

    const token = jwt.sign({ _id: user._id, name: user.email }, process.env.SECRET_KEY);

    res
        .status(200)
        .cookie("token", token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            sameSite: "none",
            secure: true
        })
        .json({
            success: true,
            message: 'Login Successfull',
            user
        })

}


export const getUserProfile = (req, res, next) => {
    try {
        res
            .status(200)
            .json({
                success: true,
                user: req.user
            })
    } catch (error) {
        next(error)
    }
}


export const logout = (req, res) => {
    res
        .status(200)
        .cookie('token', '', {
            expires: new Date(Date.now()),
            sameSite: "none",
            secure: true
        })
        .json({
            success: true,
            message: 'Logged out successfully'
        })
}
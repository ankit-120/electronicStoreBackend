import multer from "multer";
import { User } from "../models/userModel.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("inside multer");
        cb(null, "./public/images");
    },
    filename: (req, file, cb) => {
        console.log("inside multer");
        cb(null, Date.now() + file.originalname);
    },
});

export const uploadMiddleware = multer({ storage });

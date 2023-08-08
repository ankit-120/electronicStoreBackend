import { customError } from "../utils/customClass.js";

export const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    if (err.name === "CastError") {
        err = new customError(`Resource not found ${err.path}`, 404);
    }

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

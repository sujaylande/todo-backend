class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        //this.message = message;
    }
}

export const errorMiddleware = (err, req, res, next) => {

    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    res.status(404).json({
        success: false,
        message: err.message,
    });
}

export default ErrorHandler;
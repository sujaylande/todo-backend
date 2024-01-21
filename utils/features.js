import jwt from "jsonwebtoken";


const sendCookie = (user, res, message, statusCode=200) => {
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

        res
            .status(statusCode)
            .cookie("token", token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 1000 * 60 * 15, //15 mins expiry
                sameSite: process.env.NODE_ENV === "development" ? "lax" : "none", //lax for development, none for production
                secure: process.env.NODE_ENV === "development" ? false : true, //false for development, true for production
            })
            .json({
                success: true,
                message,
            });
}

export default sendCookie;
import User from "../models/user.js";
import bcrypt from "bcrypt";
import sendCookie from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

const loginUser = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email }).select("+password"); //to return password in response

        if (!user) return next(new ErrorHandler("Invalid email or password", 400));

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return next(new ErrorHandler("Invalid email or password", 400));

        sendCookie(user, res, `Welcome back, ${user.name}`, 200);

    } catch (error) {
        next(error);
    }
}

const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) return next(new ErrorHandler("User already exists", 400));

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        sendCookie(user, res, "User registered successfully", 201);
    } catch (error) {
        next(error);
    }
};

const getMyProfile = (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user,
    });
}

const logoutUser = (req, res) => {

    res.cookie("token", null, { //token value is set to null
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none", //lax for development, none for production
        secure: process.env.NODE_ENV === "development" ? false : true, //false for development, true for production
    }).json({
        success: true,
        message: "Logged out successfully",
    });

}

export { logoutUser, loginUser, registerUser, getMyProfile };
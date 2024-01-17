import User from "../models/user.js";
import bcrypt from "bcrypt";
import sendCookie from "../utils/features.js";

const getAllUsers = async (req, res) => {}

const loginUser = async (req, res, next) => {

    const { email, password} = req.body;

    let user = await User.findOne({ email}).select("+password"); //to return password in response

    if(!user){
        return res.status(404).json({
            success: false,
            message: "Invalid email or password",
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(404).json({
            success: false,
            message: "Invalid email or password",
        });
    }

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
}

const registerUser = async (req, res) => {

    const { name, email, password} = req.body;

    let user = await User.findOne({ email});

    if(user){
        return res.status(404).json({
            success: false,
            message: "User already exists",
        });
    }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        sendCookie(user, res, "User registered successfully", 201);

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
    }).json({
        success: true,
        message: "Logged out successfully",
    });

}

export { logoutUser, getAllUsers, loginUser, registerUser, getMyProfile};
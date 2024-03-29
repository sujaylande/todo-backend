import express from "express";
import { logoutUser, getMyProfile, registerUser, loginUser } from "../controllers/user.js";
import isAuthenticated from "../middlewares/auth.js";

const router = express.Router();

router.post('/new', registerUser);

router.post('/login', loginUser);

router.get('/logout', logoutUser); //get request because we are not sending any data

router.get('/me', isAuthenticated, getMyProfile);


export default router;
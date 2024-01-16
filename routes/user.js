import express from "express";
import User from "../models/user.js";
import { getUserDetails, jokeFunction, registerUser, getAllUsers } from "../controllers/user.js";

const router = express.Router();

router.get('/all', getAllUsers);

router.post('/new', registerUser);

router.get('/userid/joke', jokeFunction);

//dynamic url params 
//try to write dynamic url params at the end of all the routes
router.get('/userid/:id', getUserDetails);


export default router;
import express from "express";
import { newTask, getMyTask, updateTask, deleteTask } from "../controllers/task.js";
import isAuthenticated from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newTask);

router.get("/my", isAuthenticated, getMyTask);

//we use .route to chain the methods to the same route
//we use .put to update the task 
router.route("/:id").put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask);

export default router;

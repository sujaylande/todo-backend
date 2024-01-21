import ErrorHandler from "../middlewares/error.js";
import Task from "../models/task.js";

const newTask = async (req, res, next) => {

    try {
        const { title, description } = req.body;

        await Task.create({
            title,
            description,
            user: req.user,
        });

        res.status(201).json({
            success: true,
            message: "Task created successfully",
        });
    } catch (error) {
        next(error);
    }
};

const getMyTask = async (req, res, next) => {

    try {
        const userid = req.user._id;

        const tasks = await Task.find({ user: userid }); //we use find instead of findOne because we want to get all the tasks of the user

        res.status(200).json({
            success: true,
            tasks,
        });
    } catch (error) {
        next(error);
    }
};

//(cheak or uncheck)
//here we are not updating the task, we are just changing the isCompleted value 
const updateTask = async (req, res, next) => {

    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return next(new ErrorHandler("Task not found", 404));
        }

        task.isCompleted = !task.isCompleted;
        await task.save();

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
        });
    } catch (error) {
        next(error);
    }
};

const deleteTask = async (req, res, next) => {

    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return next(new ErrorHandler("Task not found", 404));
        }

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) {
        next(error);
    }

};

export { newTask, getMyTask, updateTask, deleteTask };
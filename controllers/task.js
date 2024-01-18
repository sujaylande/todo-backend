import Task from "../models/task.js";

const newTask = async (req, res, next) => {

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
 };

const getMyTask = async (req, res, next) => { 

    const userid = req.user._id;

    const tasks = await Task.find({ user: userid }); //we use find instead of findOne because we want to get all the tasks of the user

    res.status(200).json({
        success: true,
        tasks,
    });
};

//(cheak or uncheck)
//here we are not updating the task, we are just changing the isCompleted value 
const updateTask = async (req, res, next) => {

    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found",
        });
    }

    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
        success: true,
        message: "Task updated successfully",
    });
};

const deleteTask = async (req, res, next) => {

    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found",
        });
    }

    await task.deleteOne(); //we use deleteOne instead of remove() because delete is deprecated

    res.status(200).json({
        success: true,
        message: "Task deleted successfully",
    });
};

export { newTask, getMyTask, updateTask, deleteTask };
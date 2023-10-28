import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask = async(req,res,next)=>{
    try {
        const {title,description} = req.body;
    
    await Task.create({title,description,user:req.user});

    await res.status(201).json({
        succes:true,
        message:"Task added"
    });
    } catch (error) {
        next(error);
    }
}


export const getMyAllTasks = async(req,res,next)=>{
    try {
        const userID = req.user._id;

    const allTasks = await Task.find({user:userID});

    await res.status(201).json({
        succes:true,
        Task:allTasks,
    });
    } catch (error) {
        next(error);
    }
}


export const updateTask = async(req,res,next)=>{
    try {
        const {id} = req.params;

    const task = await Task.findById(id);
    if(!task)return next(new ErrorHandler("Invalid ID",404));

    task.isCompleted = !task.isCompleted;
    await task.save();

    await res.status(201).json({
        succes:true,
        message:"Task updated"
    });
    } catch (error) {
        next(error);
    }
}

export const deleteTask = async(req,res,next)=>{
    try {
        const {id} = req.params;

    const task = await Task.findById(id);

    if(!task)return next(new ErrorHandler("Invalid ID",404));

    await task.deleteOne();

    await res.status(201).json({
        succes:true,
        message:"Task deleted"
    });
    } catch (error) {
        next(error);
    }
}
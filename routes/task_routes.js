import express from "express";
import { deleteTask, getMyAllTasks, newTask, updateTask } from "../controllers/task_controller.js";
import {isAuthenticate} from "../middlewares/auth.js"


const routes = express.Router();

routes.post("/new",isAuthenticate,newTask);

routes.get("/mytask",isAuthenticate,getMyAllTasks);

routes.route("/:id").put(isAuthenticate, updateTask).delete(isAuthenticate, deleteTask);

export default routes;
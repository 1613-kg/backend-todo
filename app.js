import express from "express";
import {config} from "dotenv"
import userRouter from "./routes/user_routes.js"
import taskRouter from "./routes/task_routes.js"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
    path:"./database/config.env",
})

//using middlewares

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}))
//using routes 

app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",taskRouter);


app.use(errorMiddleware);
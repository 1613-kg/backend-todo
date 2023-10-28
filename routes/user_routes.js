import express from "express";
import { getMyProfile, loginUser, logout, registerNewUser } from "../controllers/user_controller.js";
import { isAuthenticate } from "../middlewares/auth.js";

const router = express.Router();


//get api

router.get("/me",isAuthenticate,getMyProfile)
router.get("/logout",logout);

//post api

router.post("/new",registerNewUser);
router.post("/login",loginUser);

export default router;
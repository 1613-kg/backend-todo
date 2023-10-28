import { User } from "../models/user_model.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

export const getMyProfile = (req,res)=>{
    res.status(201).json({
       success:true,
       user:req.user,
    })
}

export const loginUser = async(req,res,next)=>{
    try {
        const {email,password} = req.body; 

    let user = await User.findOne({email}).select("+password");

    if(!user)return next(new ErrorHandler("User not found",400));
    
    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch)return next(new ErrorHandler("Incorrect password",400));

    sendCookie(user,res,201,`Welcome back ${user.name}`);
    } catch (error) {
        next(error);
    }
}


export const registerNewUser = async(req,res,next)=>{
    try{
        const {name,email,password} = req.body; 
    
        let user = await User.findOne({email});
    
        if(user)return next(new ErrorHandler("User already exists",400));
        
        const hashedPass = await bcrypt.hash(password,10);
        user = await User.create({
            name,
            email,
            password:hashedPass,
        });
    
        sendCookie(user,res,201,"Registered succesfully");
    }catch(error){
        next(error);
    }
    
}

export const logout = (req,res)=>{
    res.status(200).cookie("token","",{expires:new Date(Date.now()),sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
    secure:process.env.NODE_ENV==="Development"?false:true,}).json({
        success:true,
    })  
}
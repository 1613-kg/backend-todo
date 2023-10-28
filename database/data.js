import mongoose from "mongoose";

export const ConnectDB = ()=>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName:"backend_project"
    }).then(()=>console.log("DB Connected")).catch((e)=>console.log(e));
} 
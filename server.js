import {app} from "./app.js";
import { ConnectDB } from "./database/data.js";


ConnectDB();

app.listen(process.env.PORT,()=>{
    console.log(`Server is working on PORT : ${process.env.PORT} in ${process.env.NODE_ENV}`);
})
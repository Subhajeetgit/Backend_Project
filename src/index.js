

import dotenv from "dotenv"
import connectDb from "./db/index.js";
import { app } from "./app.js";
dotenv.config({
    path: './.env'
})


connectDb()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server running in port : ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log("MONGO CONNECTION FAILED !!! ", err);
    
})
















// import express from "express"
// const app=express();


// (async ()=>{
//     try {
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//        app.on("error", (error)=>{
//         console.log("Error not talking", error);
//         throw error;
        
//        })
//        app.listen(process.env.PORT, ()=>{
//         console.log(`App is listening on port ${process.env.PORT}`);

        
//        })
        
//     } catch (error) {
//         console.error("ERROR: ", error)
//         throw err
//     }
// })()
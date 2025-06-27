import mongoose, { mongo } from "mongoose";
import {DB_NAME} from "../constants.js"
import { Db } from "mongodb";
const connectDb= async()=>{
    try {
        const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDb conncected !! DB host ${connectionInstance.connection.host}`);
        
        
    } catch (error) {
        console.log("MONGODB connection error", error);
        process.exit(1)
        
    }
}

export default connectDb
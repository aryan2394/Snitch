import mongoose from "mongoose";
import { config } from "./config.js";
async function connectToDb()
{
    try{
        await mongoose.connect(config.MONGO_URI);
        console.log("Database connected successfully");
    }
    catch(err){
        console.log(err)
        throw new Error("Database connection failed");
        process.exit(1);
    }
}
export default connectToDb;
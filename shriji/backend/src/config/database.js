import mongoose from "mongoose";
import {config} from './config.js';
export async function connectionToDb()
{
    try {
        const conn = await mongoose.connect(config.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host} by shri ji`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message} by shri ji`);
        process.exit(1);
    }
}
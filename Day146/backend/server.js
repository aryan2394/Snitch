import "dotenv/config"
import app from "./src/app.js"
import { connectToDb } from "./src/config/database.js";
connectToDb();
app.listen(3000,()=>
{
    console.log("shri ji server is running by shri ji");
})
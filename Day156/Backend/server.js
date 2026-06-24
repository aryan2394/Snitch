import app from "./src/app.js";
import {config} from "./src/config/config.js";
import connectToDb from "./src/config/database.js";
connectToDb();
const port=config.PORT;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

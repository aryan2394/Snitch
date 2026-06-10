import app from "./src/app.js";
import { config } from "./src/config/config.js";
import connectToDb from "./src/config/database.js";
connectToDb()
const PORT=config.PORT
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
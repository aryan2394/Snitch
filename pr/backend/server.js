import app from "./src/app.js";
import { config } from "./src/config/config.js";
import { connectToDb } from "./src/config/database.js";
const PORT=config.PORT;
connectToDb()
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

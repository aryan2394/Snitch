import app from './src/app.js';
import {config} from './src/config/config.js';
const port=config.PORT;
app.listen(port,()=>
{
    console.log(`Server is running on port ${port} by shri ji`);
})
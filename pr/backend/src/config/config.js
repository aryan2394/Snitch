import "dotenv/config";
if(!process.env.PORT)
{
    throw new Error("Please provide PORT in environment variables");
}
if(!process.env.MONGO_URI)
{
    throw new Error("Please provide MONGO_URI in environment variables");
}
if(!process.env.JWT_SECRET)
{
    throw new Error("Please provide JWT_SECRET in environment variables");
}
export const config={
    PORT:process.env.PORT,
    MONGO_URI:process.env.MONGO_URI,
    JWT_SECRET:process.env.JWT_SECRET
}   
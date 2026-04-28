import "dotenv/config"
// ek ek object hai jsimein hum saare .env ko access karte hai 
export const config={
    MONGO_URI:process.env.MONGO_URI,
}
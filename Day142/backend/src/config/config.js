import "dotenv/config"
// ek ek object hai jsimein hum saare .env ko access karte hai 
if(!process.env.MONGO_URI)
{
    throw new Error("shri ji mongo uri is not defined by shri ji")
}
if(!process.env.JWT_SECRET)
{
    throw new Error("shri ji jwt secret is not defined in .env by shri ji")
}

// ham kuch bhi .env file nahi dikhat ahai toh hum poora server hi band kar dete hai kyon bhai baaki saare features chalne do n server hi kyon band kar de rahe ho iska exmaple gemini se dete hai that is maanlo aap perpexicity use kar rahe ho and gemini ka mdoel use karene ke liye humein need hoti hai apiKey ki and agar wo exists mahi karega toh user ko button toh dikahega sab cheez kaam bhi karega lekin response nahi milega
// ya maanlo mongoDb connecetd nahi hai server se user ko login page dik raha hai lekin db se connecetd nahi toh user login faliser,regseter fail 
// user ka mood kaharab ho jayega ki kya banaye ho bhai data sahi dene pe bhi kuch chal nahi raha hai 
export const config={
    MONGO_URI:process.env.MONGO_URI,
    JWT_SECRET:process.env.JWT_SECRET
}
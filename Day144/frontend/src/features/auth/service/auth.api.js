import axios from "axios"
const authApiInstance=axios.create({
    baseURL:"/api/auth",
    withCredentials:true
})
export async function register({email,contact,password,fullname,isSeller})
{
    const response=await authApiInstance.post("/register",{
        email,password,contact,fullname,isSeller
    })
    return response.data;
}

export async function login({email,password})
{
    // dekho ab aap jab browser se request karoge ki mujhe login karna hai lekin aapne baseurl toh bataya hi nahi nahi hi aapne port numbere bataya hai matlab 
    // lekin aap keh rahe ho ki user jab jab button par click karein tab wo /api/auth/login pe aa jaaye beacuse aapne buss itna hi bataya hai baseurl and login function ke hisab se 
    // toh browser kya karega ki aapne toh n url bataya bataya n host (3000 ya 8000 ya kuch bhi) toh brosswer jis tab mein hai and jo url use kar raha hai 
    // ussi se wo host and url le lega and aage ke request ko bhej dega 
    // matlab brwoser is runnign on localhost:5173 and hum waha se login data bhejana cha rahe hai lkein hum toh sirf bole ki /api/auth/login pe ye data bhej do 
    // lekin url bataya nahi toh browser jo hai wo localshot:5173/auth/api/login pe data bhe dega 
    
    const response=await authApiInstance.post("/login",{email,password});
    return response.data;
}
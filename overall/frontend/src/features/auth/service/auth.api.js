import axios from "axios";
const authApiInstance= axios.create({
    baseURL:"/api/auth",
    withCredentials:true,
})

export async function register({email,password,fullName,contact,isSeller})
{
    try {
        const response=await authApiInstance.post("/register",{email,password,fullName,contact,isSeller});
        return response.data;
    } catch (error) {
        console.log(error);
        throw error.response?.data?.message || error.message;
    }
}
export async function login({email,password})
{
    try {
        const response=await authApiInstance.post("/login",{email,password});
        return response.data;
    } catch (error) {
        console.log(error);
        throw error.response?.data?.message || error.message;
    }
}

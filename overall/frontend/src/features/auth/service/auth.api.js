import axios from "axios";
const authApiInstance= axios.create({
    baseURL:"/api/auth",
    withCredentials:true,
})

export async function register({email,password,fullname,contact,isSeller})
{
    try {
        const response=await authApiInstance.post("/register",{email,password,fullname,contact,isSeller});
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
export async function getMe()
{
    try {
        const response=await authApiInstance.get("/me");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error.response?.data?.message || error.message;
    }
}
export async function updateRole({role})
{
    try {
        const response=await authApiInstance.put("/update-role",{role});
        return response.data;
    } catch (error) {
        console.log(error);
        throw error.response?.data?.message || error.message;
    }
}

import axios from "axios";
const authApiInstance=axios.create({
    baseURL:"http://localhost:3000/api/auth",
    withCredentials:true
});
export async function register({email,contact,password,fullname,isSeller})
{
    try
    {
        const response=await authApiInstance.post("/register",{email,contact,password,fullname,isSeller});
        return response.data;
    }
    catch(err)
    {
        console.log(err);
        throw err.response?.data || { message: err.message || 'Network Error' };
    }
}
export async function login({email,password})
{
    try
    {
        const response=await authApiInstance.post("/login",{email,password});
        return response.data;
    }
    catch(err)
    {
        console.log(err);
        throw err.response?.data || { message: err.message || 'Network Error' };
    }
}
import { useDispatch } from "react-redux";
import { setError,setLoading,setUser } from "../state/auth.slice";
import { register,login,getMe } from "../service/auth.api";
export const useAuth=()=>
{
    const dispatch=useDispatch();
    async function handleRegister({fullname,email,password,contact,isSeller})
    {
        try{
            dispatch(setLoading(true));
            const data=await register({fullname,email,password,contact,isSeller});
            dispatch(setUser(data.user));
            return data.user;  
        }
        catch(err)
        {
            dispatch(setError(err));
        }
        finally
        {
            dispatch(setLoading(false));
        }
    }
    async function handleLogin({email,password})
    {
        try{
            dispatch(setLoading(true));
            const data=await login({email,password});
            dispatch(setUser(data.user));
            return data.user;
        }
        catch(err)
        {
            dispatch(setError(err));
        }
        finally
        {
            dispatch(setLoading(false));
        }
    }
    async function handleGetMe()
    {
        try{
            dispatch(setLoading(true));
            const data=await getMe();
            dispatch(setUser(data.user));
            return data.user;
        }
        catch(err)
        {
            dispatch(setError(err));
        }
        finally
        {
            dispatch(setLoading(false));
        }
    }
    return{
        handleRegister,
        handleLogin,
        handleGetMe,
    }
}
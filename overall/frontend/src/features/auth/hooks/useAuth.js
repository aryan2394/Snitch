import { setError,setLoading,setUser } from "../state/auth.slice.js"; 
import { login,register,getMe,updateRole } from "../service/auth.api.js";
import { useDispatch} from "react-redux"; 
export const useAuth=()=>
{
    const dispatch=useDispatch();
    async function handleRegister({email,contact,password,fullname,isSeller})
    {
        try {
            dispatch(setLoading(true));
            const data=await register({email,contact,password,fullname,isSeller});
            dispatch(setUser(data.user));
            return data.user; 
            
        } catch (error) {
            dispatch(setError(error.message));
        }
        finally{
            dispatch(setLoading(false));
        }
    }
    async function handleLogin({email,password})
    {
        try {
            dispatch(setLoading(true));
            const data=await login({email,password});
            dispatch(setUser(data.user));
            return data.user;
            
        } catch (error) {
            dispatch(setError(error.message));
        }
        finally{
            dispatch(setLoading(false));
        }
    }
    async function checkAuth()
    {
        try {
            dispatch(setLoading(true));
            const data=await getMe();
            dispatch(setUser(data.user));
            return data.user;
        } catch (error) {
            dispatch(setUser(null));
            dispatch(setError(error));
        }
        finally{
            dispatch(setLoading(false));
        }
    }
    async function handleUpdateRole({role})
    {
        try {
            dispatch(setLoading(true));
            const data=await updateRole({role});
            dispatch(setUser(data.user));
            return data.user;
        } catch (error) {
            dispatch(setError(error));
            throw error;
        }
        finally{
            dispatch(setLoading(false));
        }
    }
    return {
        handleRegister,
        handleLogin,
        checkAuth,
        handleUpdateRole,
    }
}
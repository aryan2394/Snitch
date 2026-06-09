import { data } from "react-router";
import { register, login, getMe } from "../service/auth.api.js";
import { setUser, setError, setLoading } from "../state/auth.slice.js";
import { useDispatch } from "react-redux";
export function useAuth() {
    const dispatch = useDispatch();
    async function handleRegister({ email, contact, password, fullname, isSeller = false }) {
        try {
            dispatch(setLoading(true));
            const data = await register({ email, contact, password, fullname, isSeller });
            dispatch(setUser(data.user));
            return data.user;
        }
        catch (err) {
            dispatch(setError(err.message || err));
        }
        finally {
            dispatch(setLoading(false));
        }
    }
    async function handleLogin({ email, password }) {
        try {
            dispatch(setLoading(true));
            const data = await login({ email, password });
            dispatch(setUser(data.user));
            return data.user;
        }
        catch (err) {
            dispatch(setError(err.message || err));
        }
        finally {
            dispatch(setLoading(false));
        }
    }
    async function handleGetMe() {
        try {
            dispatch(setLoading(true));
            const data = await getMe();
            dispatch(setUser(data.user));
        }
        catch (err) {
            dispatch(setError(err.message || err));
        }
        finally {
            dispatch(setLoading(false));
        }
    }
    return { handleRegister, handleLogin, handleGetMe };
}
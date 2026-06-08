import {createBrowserRouter} from "react-router";
import Register from "../features/auth/pages/register.jsx";
import Login from "../features/auth/pages/login.jsx";
const router=createBrowserRouter([
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/",
        element: <h1 className='text-3xl font-bold underline text-center text-red-500'>shri ji</h1>
    },
]);
export default router;
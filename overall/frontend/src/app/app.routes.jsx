import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/register";
import Login from "../features/auth/pages/Login";
import ChooseRole from "../features/auth/pages/ChooseRole";
export const routes=createBrowserRouter([
    {
        path:"/",
        element:<h1>hello </h1>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/choose-role",
        element:<ChooseRole/>
    }
])
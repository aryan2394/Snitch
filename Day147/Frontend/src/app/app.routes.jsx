import {createBrowserRouter} from "react-router";
import Register from "../features/auth/pages/register.jsx";
import Login from "../features/auth/pages/login.jsx";
import CreateProduct from "../features/products/pages/CreateProduct.jsx";
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
    {
        path:"/seller/create-product",
        element:<CreateProduct/>
    }
]);
export default router;
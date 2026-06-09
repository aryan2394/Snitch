import {createBrowserRouter} from "react-router";
import Register from "../features/auth/pages/register.jsx";
import Login from "../features/auth/pages/login.jsx";
import CreateProduct from "../features/products/pages/CreateProduct.jsx";
import Dashboard from "../features/products/pages/Dashboard.jsx";
import Protected from "../features/auth/components/Protected.jsx";
import Home from "../features/products/pages/Home.jsx";
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
        element:<Home/> 
    },
    {
       path:"/seller",
       children:[
        {
            path:"/seller/create-product",
            element:<Protected role="seller">
                <CreateProduct/>
            </Protected>
        },
        {
            path:"/seller/dashboard",
            element:<Protected role="seller">
                <Dashboard/>
            </Protected>
        }
       ]
    }
]);
export default router;
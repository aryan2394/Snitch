import {createBrowserRouter} from "react-router";
import Register from "../features/auth/pages/register.jsx";
import Login from "../features/auth/pages/login.jsx";
import ChooseRole from "../features/auth/pages/ChooseRole.jsx";
import CreateProduct from "../features/products/pages/CreateProduct.jsx";
import Dashboard from "../features/products/pages/Dashboard.jsx";
import Protected from "../features/auth/components/Protected.jsx";
import Home from "../features/products/pages/Home.jsx";
import ProductDetail from "../features/products/pages/ProductDetail.jsx";
import SellerProductDetails from "../features/products/pages/SellerProductDetails.jsx"; 
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
        path:"product/:productId",
        element:<ProductDetail/>
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
        },
        {
            path:"/seller/product/:productId",
            element:<Protected role="seller">
                <SellerProductDetails/>
            </Protected>
        }
       ]
    },
    {
        path: "/choose-role",
        element: <ChooseRole />
    }
]);
export default router;
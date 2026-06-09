import { setSellerProducts,setProducts } from "../state/product.slice";
import { createProduct,getSellerProducts,getAllProducts,getProductDetail} from "../services/product.api";
import {useDispatch} from "react-redux"
export const useProduct=()=>
{
    const dispatch=useDispatch();
    async function handleCreateProduct(formData)
    {
        const data=await createProduct(formData);
        return data.product;
    }
    async function handleGetSellerProduct() {
        const data=await getSellerProducts();
        dispatch(setSellerProducts(data.products))
        return data.products;
    }
    async function handleGetAllProducts()
    {
        const data=await getAllProducts();
        dispatch(setProducts(data.products));
        return data.products;
    }
    async function handleGetProductById(productId)
    {
        const data=await getProductDetail(productId);
        return data.product;
    }
    
    return{
        handleCreateProduct,handleGetSellerProduct,handleGetAllProducts,handleGetProductById
    }
}
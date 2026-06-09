import React from "react";
import { useParams } from "react-router";
import { useProduct } from "../hooks/useProduct";
import { useEffect ,useState} from "react";
function ProductDetail()
{
    const {productId}=useParams();
    const {handleGetProductById}=useProduct();
    const [product,setProduct]=useState(null);
    console.log(productId);
    async function fetchProductDetails()
    {
        const data=await handleGetProductById(productId);
        setProduct(data);
    }
    useEffect(()=>
    {
        fetchProductDetails();
    },[productId])
    console.log(product);
    return(
        <>
        <h1>Product Detail</h1>
        </>
    );
}
export default ProductDetail;

import { addItem,getCart } from "../service/cart.api";
import {setItems,addItem as addItemToCart} from "../state/cart.slice.js"
import {useDispatch} from "react-redux"
export const useCart=()=>
{
    const dispatch=useDispatch();
    async function handleAddItem({productId,variantId})
    {
        const data=await addItem({productId,variantId}); 
        return data;
    }
    async function handleGetCart()
    {
        const data=await getCart();
        dispatch(setItems(data.cart));
        return data.cart;
    }
    return {
        handleAddItem,handleGetCart
    }
}
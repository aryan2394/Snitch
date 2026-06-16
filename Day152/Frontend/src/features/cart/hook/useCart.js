import { addItem, getCart,incrementCartItemApi } from "../service/cart.api.js";
import { setItems, addItem as addItemToCart, incrementCartItem } from "../state/cart.slice.js"
import { useDispatch } from "react-redux"
export const useCart = () => {
    const dispatch = useDispatch();
    async function handleAddItem({ productId, variantId }) {
        const data = await addItem({ productId, variantId });
        return data;
    }
    async function handleGetCart() {
        const data = await getCart();
        dispatch(setItems(data.cart.items));
    }
    async function handleIncrementCartItem({productId,variantId})
    {
        const data=await incrementCartItemApi({productId,variantId});
        dispatch(incrementCartItem({productId,variantId}));
    }
    return {
        handleAddItem, handleGetCart,handleIncrementCartItem
    }
}
import { addItem, getCart, incrementCartItemApi, decrementCartItemApi, removeCartItemApi } from "../service/cart.api.js";
import { setItems, addItem as addItemToCart, incrementCartItem, decrementCartItem, removeCartItem } from "../state/cart.slice.js"
import { useDispatch } from "react-redux"
export const useCart = () => {
    const dispatch = useDispatch();
    async function handleAddItem({ productId, variantId }) {
        const data = await addItem({ productId, variantId });
        return data;
    }
    async function handleGetCart() {
        const data = await getCart();
        dispatch(setItems(data.cart));
    }
    async function handleIncrementCartItem({productId,variantId})
    {
        const data=await incrementCartItemApi({productId,variantId});
        dispatch(incrementCartItem({productId,variantId}));
    }
    async function handleDecrementCartItem({productId,variantId})
    {
        const data=await decrementCartItemApi({productId,variantId});
        dispatch(decrementCartItem({productId,variantId}));
    }
    async function handleRemoveCartItem({productId,variantId})
    {
        const data=await removeCartItemApi({productId,variantId});
        dispatch(removeCartItem({productId,variantId}));
    }
    return {
        handleAddItem, handleGetCart, handleIncrementCartItem, handleDecrementCartItem, handleRemoveCartItem
    }
}
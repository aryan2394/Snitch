import {createSlice} from "@reduxjs/toolkit"
const cartSlice=createSlice({
    name:"cart",
    initialState:{
        items:[],
        totalPrice:null,
        currency:null 
    },
    reducers:{
        setItems:(state,action)=>
        {
            state.items=action.payload.items;
            state.totalPrice=action.payload.totalPrice;
            state.currency=action.payload.currency;
        },
        addItem:(state,action)=>
        {
            state.items.push(action.payload)
        },
        incrementCartItem:(state,action)=>{
            const {productId,variantId}=action.payload;
            const itemIndex = state.items.findIndex(item=>item.product._id===productId && item.variant===variantId);
            if(itemIndex !== -1) {
                const item = state.items[itemIndex];
                item.quantity += 1;
                const variantDetail = Array.isArray(item.product?.variants) 
                    ? item.product.variants.find(v => v._id === variantId || v.id === variantId)
                    : item.product?.variants;
                const price = item.price?.amount ?? variantDetail?.price?.amount ?? item.product?.price?.amount ?? 0;
                if (state.totalPrice !== null) state.totalPrice += price;
            }
        },
        decrementCartItem:(state,action)=>{
            const {productId,variantId}=action.payload;
            const itemIndex = state.items.findIndex(item=>item.product._id===productId && item.variant===variantId);
            if(itemIndex !== -1) {
                const item = state.items[itemIndex];
                const variantDetail = Array.isArray(item.product?.variants) 
                    ? item.product.variants.find(v => v._id === variantId || v.id === variantId)
                    : item.product?.variants;
                const price = item.price?.amount ?? variantDetail?.price?.amount ?? item.product?.price?.amount ?? 0;
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    state.items.splice(itemIndex, 1);
                }
                if (state.totalPrice !== null) state.totalPrice -= price;
            }
        },
        removeCartItem:(state,action)=>{
            const {productId,variantId}=action.payload;
            const itemIndex = state.items.findIndex(item=>item.product._id===productId && item.variant===variantId);
            if(itemIndex !== -1) {
                const item = state.items[itemIndex];
                const variantDetail = Array.isArray(item.product?.variants) 
                    ? item.product.variants.find(v => v._id === variantId || v.id === variantId)
                    : item.product?.variants;
                const price = item.price?.amount ?? variantDetail?.price?.amount ?? item.product?.price?.amount ?? 0;
                const totalItemPrice = price * item.quantity;
                state.items.splice(itemIndex, 1);
                if (state.totalPrice !== null) state.totalPrice -= totalItemPrice;
            }
        },
    }
})
export const {setItems,addItem,incrementCartItem,decrementCartItem,removeCartItem}=cartSlice.actions;
export default cartSlice.reducer;
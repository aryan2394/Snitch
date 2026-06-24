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
        }
    }
})
export const {setItems,addItem}=cartSlice.actions;
export default cartSlice.reducer;
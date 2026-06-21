import mongoose from "mongoose";
const priceSchema=new mongoose.Schema({
    amount:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        required:true
    },
})
export default priceSchema;
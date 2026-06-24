import mongoose from "mongoose";
import priceSchema from "./price.schema.js";
import Razorpay from "razorpay";
const paymentSchema=new mongoose.Schema({
    amount:{
        type:priceSchema,
        required:true
    },
    status:{  
        type:String,
        enum:["pending","paid","failed"],
        default:"pending",
        required:true,
    },
    razorPay:{
        orderId:String,
        paymentId:String,
        signature:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    orderDetails:[
        {
            title:String,
            productId:mongoose.Schema.Types.ObjectId,
            variantId:mongoose.Schema.Types.ObjectId,
            quantity:Number,
            images:[{url:String}],
            description:String,
            price:priceSchema
        }
    ]
    
})
const paymentModel=mongoose.model("payment",paymentSchema);
export default paymentModel; 
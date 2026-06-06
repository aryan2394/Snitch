import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    price:{
        amount:{
            type:Number,
            required:true,
        },
        currency:{
            type:String,
            required:true,
            enum:["USD","INR","EUR"],
            default:"USD",
        }
    },
    images:[
        {
            url:{
                type:String,
                required:true,
            },
        }
],      
},{
    timestamps:true,
})
const productModel=mongoose.model("product",productSchema);
export default productModel;

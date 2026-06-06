import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// humein role based authentication chahiye like for buyer and seller diffeent dashboard rahe toh hum kaise pehchnae
// ki use rkaun hai by its role
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    contact:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    fullname:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["buyer","seller"],
        required:true,
        default:"buyer"
    }
},{timestamps:true});
userSchema.pre("save",async function()
{
    if(!this.isModified("password"))
    {
        return;
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
});
userSchema.methods.comparePassword=async function(password)
{
    return await bcrypt.compare(password,this.password);
};
const userModel = mongoose.model("user",userSchema);
export default userModel;
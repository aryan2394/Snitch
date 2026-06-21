import mongoose from "mongoose"; 
import bcrypt from "bcryptjs";
const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:function ()
        {
            if(!this.googleId)
            return true;
            return false;
        },
        select:false
    }, 
    contact:{
        type:String,
        sparse:true,
        unique:true,
        required:false,
    },
    role:{
        type:String,
        enum:["buyer","seller","pending"],
        default:"buyer"
    },
    googleId:{
        type:String
    }
}, {timestamps:true});
userSchema.pre("save",async function()
{
    if(!this.isModified("password"))
    {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    return this.password=await bcrypt.hash(this.password,salt);  
})
userSchema.methods.comparePassword=async function(password)
{
    return await bcrypt.compare(password,this.password);
}
const userModel=mongoose.model("user",userSchema);
export default userModel;
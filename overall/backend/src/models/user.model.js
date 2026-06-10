import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    contact:{
        type:String,
        required:true,
        unique:true
    },
    fullName:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["buyer","seller"],
        default:"buyer",
        required:true 
    }
});
userSchema.pre("save",function()
{
    if(!this.isModified("password"))
        return;
    return this.password=bcrypt.hash(this.password,10);
})
userSchema.methods.comparePassword=function(password)
{
    return bcrypt.compare(password,this.password);
}
const userModel=mongoose.model("user",userSchema);
export default userModel;
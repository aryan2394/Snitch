import mongoose from "mongoose";
import bcrypt from "bcryptjs"
// store username,phone,email,password and humare paas 2 types ke user hai that is seller(jo products becjege website pe) and buyer(jo buy karega)
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    fullname:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:{
            values:["seller","buyer"]
        },
        default:"buyer"
    }
})

// 🔐 Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return ;
  return this.password = await bcrypt.hash(this.password, 10);
});

// 🔑 Compare password during login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const userModel=mongoose.model("user",userSchema);
export default userModel;


import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please provide the username"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"please provide the email"],
        unique:true
    },
    number:{
        type:String,
        required:[true,"please provide the number"],
        unique:true
    },
  
},{timeStamp : true})
const Usermodel=mongoose.model.User || mongoose.model("User",userSchema)

export  {Usermodel}
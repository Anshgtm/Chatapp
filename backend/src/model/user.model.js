import { Schema , model } from "mongoose";

const userSchema = new Schema({
    Fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    profilePic: {
      type: String,
      default: "",
    },
})
const userModel = model("User",userSchema);
export default userModel;
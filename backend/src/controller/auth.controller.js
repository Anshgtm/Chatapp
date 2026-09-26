import bcrypt from "bcryptjs"
import userModel from "../model/user.model.js";
import { generateToken } from "../lib/token.utils.js";
import cloudinary from "../lib/cloudinary.js";
export const signup = async(req,res)=>{
    const {Fullname,email,password}  = req.body;
    if(!Fullname || !email || !password){
       return res.status(400).json({
            message:"Every field is required"
        })
    }
    if(password.length<8){
       return res.status(400).json({
            message:"Password should be of minimum 8 characters"
        })
}
    const user = await userModel.findOne({email})
    if(user){
        console.log(email);
        return res.status(400).json({
            message:"User Already existed"
        })
}
     const salt = await bcrypt.genSalt(10);
     const hashedpassword = await bcrypt.hash(password,salt);

     const newuser = userModel({
        Fullname,
        email,
        password:hashedpassword
    }
);
  if(newuser){
    generateToken(newuser._id,res);
    await newuser.save()
    res.status(200).json({
        Fullname:newuser.Fullname,
        email:newuser.email,
        profilePic: newuser.profilePic,
        })
}
}
export const login = async(req,res)=>{
    const {FullName,email,password} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user){
          return  res.status(400).json({
            message:'User do not exist please Signup'
          })

        }
        const isPassword = await bcrypt.compare(password,user.password)
        if(!isPassword){
            return res.status(400).json({
            message:'Incorrect Password Please try again'
            })}
                generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      FullName: user.Fullname,
      email: user.email,
      profilePic: user.profilePic,
    });
    }
    catch(error){

    }

    
}
export const logout = async(req,res)=>{
    try{
    res.cookie("jwt","",{
        maxAge:0,
    })
    res.status(200).json({
        message:"Logged out successfully"
    })
}
catch(error){
    res.status(500).json({
        message:"Error occurred while logging out"
    })

}
    
}
export const updateuser = async(req,res)=>{
    try{
    const {profilePic} = req.body;
    const userId = req.user._id;
    if(!profilePic){
        res.status(400).json({
            message:"Profile picture is required"
        })
    }
    const updatedprofile =  await cloudinary.uploader.upload(profilePic)
    const updateduser =  await userModel.findByIdAndUpdate(userId,{
        profilePic:updatedprofile.secure_url
    },{new:true})
    res.status(200).json({
        message:"Profile picture updated successfully",
        profilePic:updateduser.profilePic
    })
}
catch(error){
    res.status(500).json({
        message:"Error occurred while updating profile picture"
    })

}
    
}
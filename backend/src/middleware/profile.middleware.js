import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";
export const protecteduser = async(req,res,next)=>{
    try{
    const token = req.cookies.jwt;
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    if(!decoded){
        return res.status(401).json({
            message:"Unauthorized"
        })}
    const user = await userModel.findById(decoded.userId).select("-password"); 
    if(!user){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    req.user = user;
    next();   
}
catch(error){
    return res.status(500).json({
        message:error.message
    })

}}
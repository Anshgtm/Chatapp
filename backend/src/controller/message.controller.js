import messageModel from "../model/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import userModel from "../model/user.model.js";

export const recievemessage = async(req,res)=>{
    const {id:chatid} = req.params;
    const myid = req.user._id;
    try{
     const messages = await messageModel.find({
        $or:[
            {senderId:myid,receiverId:chatid},
            {senderId:chatid,receiverId:myid}
        ]
    });
    res.status(200).json({
        data:messages
    });
}
catch(error){
    res.status(500).json({
        message:error.message
    });
};
}
export const sendmessage = async(req,res)=>{
    const {text,image} = req.body;
    const {id:receiverId} = req.params;
    const senderId = req.user._id;
    try{
        let imageurl;
        if(image){
        const imageuploader =  await cloudinary.uploader.upload(image);
        imageurl = imageuploader.secure_url;
        }
        const newmessage = await messageModel.create({
            senderId,
            receiverId,
            text,
            image:imageurl
        })
    await newmessage.save();
    res.status(200).json({
        message:"Message sent successfully",
        data:newmessage
    })}
catch(error){
    res.status(500).json({
        message:error.message
    });
}
}
export const getUsersForSidebar = async(req,res)=>{
    try{
        const loggedInUserId = req.user._id;
        const users = await userModel.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(200).json({
            data:users
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
    }



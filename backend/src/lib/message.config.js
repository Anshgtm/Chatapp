import {schema,model} from "mongoose";
const messageSchema = new schema({
    senderId:{
        type:String,
        required:true
    },
    receiverId:{
        type:String,
        required:true
    },
    text:{
        type:String,
    },
    image:{
        type:String
    }
})
const messageModel = model("Message",messageSchema);
export default messageModel;
import mongoose from 'mongoose';
const connectDB = async (req,res)=>{
    try{
    const conn =  await mongoose.connect("mongodb://localhost:27017/chatapp");
    console.log(`DB Connected:${conn.connection.host}`);
    }
    catch (error){
        console.log(error);
        
        }

    }

export default connectDB;
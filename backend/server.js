import express from "express"
import dotenv from "dotenv"
import cookieparser from 'cookie-parser'
import cors from 'cors'
dotenv.config()
import connectDB from "./src/lib/db.config.js"
import Authrouter from "./src/router/auth.routes.js"
import messageRouter from "./src/router/message.routes.js"
const app = express()
const PORT =  8181;
app.use(express.json())
app.use(cookieparser())
app.use(cors({
    origin:"http://localhost:5174",
    credentials:true
}))
connectDB();
app.get('/',(req,res)=>{
    res.status(200).send("hello world");
})
app.use('/auth',Authrouter);
app.use('/message',messageRouter);
app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);
})
import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/database.js";
import userroute from "./routes/userrouter.js"
import messageroute from "./routes/messageroute.js";
import cookieParser from "cookie-parser";
import { app,server } from "./Socket/socket.js";
import cors from "cors";
dotenv.config({});
//const app=express();
const port=process.env.port||5000;

// middleware
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsoption={
    origin:"http://localhost:5173",
    credentials:true
};
app.use(cors(corsoption));
app.use(express.json());
app.use("/api/v1/user",userroute);
app.use("/api/v1/message",messageroute);
app.get('/',(req,res)=>{
    res.send('Welcome to chat application website');
})
server.listen(port,()=>{
    connectdb();
    console.log(`server listen at port ${port}`);
})
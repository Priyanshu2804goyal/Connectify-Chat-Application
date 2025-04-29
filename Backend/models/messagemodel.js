import mongoose from "mongoose";
import { User } from "./usermodel.js";
const messagemodel=new mongoose.Schema({
    senderid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    receiverid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    message:{
        type:String,
        required:true,
    }
},{timestamps:true})
export const Message=mongoose.model("Message",messagemodel);
import {Conversation} from "../models/Conversationmodel.js";
import { Message } from "../models/messagemodel.js";
import { getReceiverSocketId } from "../Socket/socket.js";
import { io } from "../Socket/socket.js";
export const sendmessage=async(req,res)=>{
    try{
      const senderid=req.id;
      const receiverid=req.params.id;
      const {message}=req.body;
      let gotconversation=await Conversation.findOne({
        participants:{$all:[senderid,receiverid]}
      })
      if(!gotconversation){
         gotconversation=await Conversation.create({
            participants:[senderid,receiverid]
         })
         await gotconversation.save();
      };
      const newmessage= await Message.create({
        senderid,
        receiverid,
        message
      })
      if(newmessage){
        gotconversation.messages.push(newmessage._id);
      }
      await gotconversation.save();
      // socket.io;
      const receiversocketid=getReceiverSocketId(receiverid);
       console.log(receiversocketid);
      if(receiversocketid){
         io.to(receiversocketid).emit("newmessage",newmessage);
      }
      return res.status(201).json({newmessage});
    }catch(error){
        console.log(error);
    }
}
export const getmessage=async(req,res)=>{
    try{
    const receiverid=req.params.id;
    const senderid=req.id;
    const conversation=await Conversation.findOne({
        participants:{$all:[senderid,receiverid]}
    }).populate("messages")
    return res.status(201).json(conversation?.messages);
    }catch(error){
        console.log(error);
    }
}
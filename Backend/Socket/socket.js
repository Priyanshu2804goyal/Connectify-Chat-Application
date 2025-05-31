import {Server} from "socket.io";
import express from "express";
import http from "http";
import cors from 'cors'
 const app=express();
 const corsoption = {
  origin: "http://localhost:5173",
  credentials: true
};
 app.use(cors(corsoption));
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: corsoption
});
 export const getReceiverSocketId=(receiverid)=>{
   console.log(userSocketMap[receiverid])
   return userSocketMap[receiverid];
 }
 const userSocketMap={}; //{userid->socketid};
 io.on('connection',(socket)=>{
      console.log(socket); 
     console.log("User Connected",socket.id);
     const userid=socket.handshake.query.userId;
     if(userid!==undefined){
       userSocketMap[userid]=socket.id;
     }
     io.emit('getOnlineUsers',Object.keys(userSocketMap));
     socket.on('disconnect',()=>{
        console.log('User Disconnected',socket.id);
        delete userSocketMap[userid];
         io.emit('getOnlineUsers',Object.keys(userSocketMap));
     })
 });
 export {app,io,server};

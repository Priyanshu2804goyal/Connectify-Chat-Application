import {Server} from "socket.io";
import express from "express";
import http from "http";
 const app=express();
 const server=http.createServer(app);
 const io=new Server(server,{
     cors:{
        origin:['http://localhost:5173/'],
        methods:['GET','POST'],
     },
 });
 io.on('connection',(socket)=>{
    //console.log(socket);
     console.log("User Connected",socket.id);
 });
 export {app,io,server};
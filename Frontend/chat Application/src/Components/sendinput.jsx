import React from "react";
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setmessages } from "../redux/messageslice.js";
const Sendinput=()=>{
  const [message,setMessage]=useState("");
   const {SelectedUser}=useSelector(store=>store.user);
   const {messages}=useSelector(store=>store.message);
   const dispatch=useDispatch();
  const onSubmitHandler=async(e)=>{
       e.preventDefault();
       try{
         const res=await axios.post(`http://localhost:8080/api/v1/message/send/${SelectedUser?._id}`,{message},
          { headers:{
              'Content-Type':'application/json'
           },
           withCredentials:true
       });
         dispatch(setmessages([...messages,res?.data?.newmessage]));
       }catch(error){
           console.log(error);
       }
       setMessage("");
  }
  return(
    <form onSubmit={onSubmitHandler} className="px-4 my-3">
    <div className="w-full relative">
        <input  value={message}
        onChange={(e)=>setMessage(e.target.value)}
        type="text" placeholder="Send a message..." className="border text-sm rounded-lg block p-3 border-zinc-500 w-full bg-gray-700 text-white"/>
        <button type="submit" className="absolute flex inset-y-0 end-0 items-center pr-4">
        <IoSend />
        </button>
    </div>
    </form>
  )  
}
export default Sendinput;
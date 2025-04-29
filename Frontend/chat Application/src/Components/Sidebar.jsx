import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Otherusers from "./otherusers";
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";
const Sidebar=()=>{
    const [search,setSearch]=useState("");
    const {OtherUsers}=useSelector(store=>store.user);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const logouthandler=async()=>{
        try{
            const res=await axios.get(`http://localhost:8080/api/v1/user/logout`);
            navigate("/login");
            toast.success(res.data.message);
        }catch(err){
            console.log(err);
        }
    }
     const searchsubmitHandler=(e)=>{
          e.preventDefault();
        const conversationUser=OtherUsers?.find((user)=>user.fullname.toLowerCase().includes(search.toLowerCase()));
        if(conversationUser){
            dispatch(setOtherUsers([conversationUser]));
        }else{
            toast.error("User not found");
        }
     }
    return(
        <div className="border-r border-slate-500 p-4 flex flex-col">
            <form  onSubmit={searchsubmitHandler}
            action="" className="flex items-center gap-2">
             <input  
               value={search}
               onChange={(e)=>setSearch(e.target.value)}
             className="input input-bordered rounded-md" type="text" placeholder="Search..."/>
            <button type="submit" className="btn bg-zinc-700 text-white">
            <AiOutlineSearch className="outline-none"/>
            </button>
            </form>
           <div className="divider px-3"></div>
           <Otherusers/>
           <div className="mt-2">
            <button onClick={logouthandler} className="btn btn-sm">Logout</button>
           </div>
        </div>
    )
}
export default Sidebar;
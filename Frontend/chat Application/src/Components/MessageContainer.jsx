import React, { useEffect } from "react";
import Sendinput from "./sendinput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUsers } from "../redux/userSlice.js";
const Messagecontainer=()=>{
    const {SelectedUser,authUser,OnlineUsers}=useSelector(store=>store.user);
     const isonline=Array.isArray(OnlineUsers) && OnlineUsers.includes(String(SelectedUser?._id));
    const dispatch=useDispatch();
    useEffect(()=>{
          return ()=>dispatch(setSelectedUsers(null));
    },[])
    return(
        <>
          {
             SelectedUser!=null?(
        <div className="md:min-w-[550px] flex flex-col">
            <div className="flex gap-2 items-center bg-zinc-700 text-white px-4 py-2 mb-2">
                    <div className={`${isonline ? "avatar avatar-online" : ""}`}>
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img src={SelectedUser?.profilephoto} alt="profile-photo"/>
                        </div>
                    </div>
                <div className="flex flex-col flex-1">
                        <div className="flex justify-between gap-2">
                            <p>{SelectedUser?.fullname}</p>
                        </div>
                </div>
            </div>
            <Messages/>
            <Sendinput/>
        </div>
             ):(
                <div className="md:min-w-[550px] flex flex-col justify-center items-center">
                <h1 className="text-4xl text-black font-bold">Hi,{authUser?.fullname}</h1>
                <h1 className="text-2xl text-black">Let's  start the Conversation</h1>
                </div>
             )
            }
        </>
    )
}
export default Messagecontainer;
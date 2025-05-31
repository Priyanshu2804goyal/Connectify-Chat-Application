import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUsers } from "../redux/userSlice.js";
const Otheruser=({user})=>{
   // console.log(user);
    const dispatch=useDispatch();
    const {SelectedUser,OnlineUsers}=useSelector(store=>store.user);
    const isonline=Array.isArray(OnlineUsers) && OnlineUsers.includes(String(user?._id));
  //  console.log(`${SelectedUser?._id}`);
    const selectedUserHandler=(user)=>{
        dispatch(setSelectedUsers(user));
    }
    return(
        <>
            <div onClick={()=>selectedUserHandler(user)} className={`${SelectedUser?._id===user?._id?'bg-zinc-900 ':'text-white'} flex gap-2 hover:text-black items-center hover:bg-zinc-200 rounded p-2 cursor-pointer`}>
                    <div className={`${isonline ? "avatar avatar-online" : ""}`}>
                        <div className="w-12 rounded-full overflow-hidden">
                    <img src={user?.profilephoto} alt="profile-photo"/>
                        </div>
                    </div>
                <div className="flex flex-col flex-1">
                        <div className="flex justify-between gap-2">
                            <p>{user?.fullname}</p>
                        </div>
                </div>
                </div>
        </>
    )
}
export default Otheruser;

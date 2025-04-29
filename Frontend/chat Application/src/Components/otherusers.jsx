import React from "react";
import Otheruser from "./otheruser";
import usegetotherusers from "../hooks/useGetotherUser";
import { useSelector } from "react-redux";
const Otherusers=()=>{
    usegetotherusers();
    const {OtherUsers}=useSelector(store=>store.user);
   // console.log(OtherUsers);
    if(!OtherUsers){
      return;
    }
    return(
      <div className="h-screen overflow-auto flex-1">
           {
             OtherUsers?.map((user)=>{
                return(
                  <Otheruser key={user._id} user={user}/>
                )
             })
           }
       </div>
    )
}
export default Otherusers;
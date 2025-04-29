import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setmessages } from "../redux/messageslice";
const usegetMessages=()=>{
    const {SelectedUser}=useSelector(store=>store.user);
    const dispatch=useDispatch();
   useEffect(()=>{
       const fetchMessages=async()=>{
        if (!SelectedUser?._id) return;

        try{
            axios.defaults.withCredentials=true;
         const res= await axios.get(`http://localhost:8080/api/v1/message/${SelectedUser?._id}`);
          dispatch(setmessages(res.data));
         console.log("Messages:", res);
        }catch(error){
            console.log(error);
        }
       }
       fetchMessages();
   },[SelectedUser?._id])
}
export default usegetMessages;
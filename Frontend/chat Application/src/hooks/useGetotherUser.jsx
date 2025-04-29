import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice.js";
const usegetotherusers=()=>{
    const dispatch=useDispatch();
   useEffect(()=>{
       const fetchotherusers=async()=>{
        try{
            axios.defaults.withCredentials=true;
         const res= await axios.get(`http://localhost:8080/api/v1/user/`);
             //   console.log(`res ${res}`);
        dispatch(setOtherUsers(res.data));
        }catch(error){
            console.log(error);
        }
       }
       fetchotherusers();
   },[])
}
export default usegetotherusers;
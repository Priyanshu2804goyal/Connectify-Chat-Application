import { useDispatch, useSelector } from "react-redux"
import store from "../redux/store";
import { useEffect } from "react";
import { setmessages } from "../redux/messageslice";
const usegetRealMessages=()=>{
    const {socket}=useSelector(store=>store.socket);
    const {messages}=useSelector(store=>store.message);
    const dispatch=useDispatch();
    useEffect(()=>{
        console.log('hello');
        socket?.on("newmessage",(newmessage)=>{
             dispatch(setmessages([...messages,newmessage]));
        })
    },[socket,setmessages,messages]);
}
export default usegetRealMessages;
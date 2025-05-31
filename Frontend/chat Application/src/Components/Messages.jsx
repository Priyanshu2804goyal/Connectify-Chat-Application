import React from "react";
import Message from "./Message";
// import usegetMessages from "../hooks/useGetmessages";
import { useSelector } from "react-redux";
import usegetRealMessages from "../hooks/usegetRealTimeMessages";
import usegetMessages from "../hooks/useGetmessages";
const Messages=()=>{
    usegetMessages();
    usegetRealMessages();
    const {messages}=useSelector(store=>store.message);
    if(!messages) return;
    return(
        <div className="px-4 flex-1 overflow-auto">
            {
                 messages?.map((message)=>{
                    return (
                        <Message key={message._id} message={message}/> 
                    )
                 })
            }
        </div>
    )
}
export default Messages;
import React from "react";
import Sidebar from "./Sidebar";
import Messagecontainer from "./MessageContainer";
const Homepage=()=>{
    return(
        <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur bg-opacity-0">
            <Sidebar/>
            <Messagecontainer/>
        </div>
    )
}
export default Homepage
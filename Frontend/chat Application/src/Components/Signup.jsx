import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from 'axios'
const Signup=()=>{
    const [user,setUser]=useState({
        fullname:"",
        username:"",
        password:"",
        confirmpassword:"",
        gender:""
    })
    const navigate=useNavigate();
    const handlecheckbox=(gender)=>{
        setUser({...user,gender})
    }
    const onSubmitHandler=async(e)=>{
        e.preventDefault();
        try{
          console.log(user);
         const res= await axios.post(`http://localhost:8080/api/v1/user/register`,user,{
          headers:{
            'Content-Type':'application/json'
          },
          withCredentials:true
         })
          console.log(res);
          if(res.data.success){
            navigate("/login");
            toast.success(res.data.message);
          }
        }catch(error){
            toast.error(error.response.data.message);
          console.log(error);
        }
        setUser({
            fullname:"",
            username:"",
            password:"",
            confirmpassword:"",
            gender:""
        })
    }
    return(
        <div className="min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
                <h1 className="text-3xl font-bold text-center">Signup</h1>
                <form onSubmit={onSubmitHandler} action="">
                 <div>
                   <label className="label p-2">
                    <span className="text-base label-text">Enter Your Name</span>
                   </label>
                   <input value={user.fullname}
                     onChange={(e)=>setUser({...user,fullname:e.target.value})}
                   className="w-full input input-bordered h-10" type="text" placeholder="Enter Your Full name"/>
                 </div>
                 <div>
                   <label className="label p-2">
                    <span className="text-base label-text">Username</span>
                   </label>
                   <input value={user.username}
                     onChange={(e)=>setUser({...user,username:e.target.value})}
                   className="w-full input input-bordered h-10" type="text" placeholder="Username"/>
                 </div>
                 <div>
                   <label className="label p-2">
                    <span className="text-base label-text">Password</span>
                   </label>
                   <input value={user.password}
                     onChange={(e)=>setUser({...user,password:e.target.value})}
                   className="w-full input input-bordered h-10" type="text" placeholder="Enter Your Password"/>
                 </div>
                 <div>
                   <label className="label p-2">
                    <span className="text-base label-text">Confirm Password</span>
                   </label>
                   <input value={user.confirmpassword}
                     onChange={(e)=>setUser({...user,confirmpassword:e.target.value})}
                   className="w-full input input-bordered h-10" type="text" placeholder="Confirm Password"/>
                 </div>
                 <div className="flex items-center my-4">
                    <div className="flex items-center mx-2">
                      <p>Male</p>
                      <input 
                      type="checkbox"
                      checked={user.gender==="male"}
                      onChange={()=>handlecheckbox("male")} 
                      defaultChecked className="checkbox border-white" />
                    </div>
                    <div className="flex items-center">
                      <p>Female</p>
                      <input type="checkbox" 
                       checked={user.gender==="female"}
                       onChange={()=>handlecheckbox("female")} 
                      defaultChecked className="checkbox border-white" />
                    </div>
                 </div>
                 <p className="text-center my-2">Already have an account?<Link to="/login">Login</Link></p>
                 <div>
                    <button type="submit" className="btn btn-block btn-sm mt-2 border-slate-700">Signup</button>
                 </div>
                 </form>
            </div>
        </div>
    )
}
export default Signup
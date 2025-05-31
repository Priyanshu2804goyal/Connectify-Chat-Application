import { useEffect, useState } from 'react'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Homepage from './Components/Homepage'
import Signup from './Components/Signup'
import Login from './Components/Login'
import { useDispatch, useSelector } from 'react-redux'
import {io} from "socket.io-client" 
import { setSocket } from './redux/Socketslice'
import { setOnlineUsers } from './redux/userSlice'
const router=createBrowserRouter([
  {
    path:"/",
    element:<Homepage/>
  },
  {
    path:"/register",
    element:<Signup/>
  },
  {
    path:"/login",
    element:<Login/>
  }
])

function App() {
  const {authUser}=useSelector(store=>store.user);
   const {socket}=useSelector(store=>store.socket);
  const dispatch=useDispatch();
  useEffect(()=>{
     if(authUser){
        const Socket=io('http://localhost:8080',{
           query:{
            userId:authUser._id,
           },
           transports: ['websocket'],
            withCredentials: true
        });
        dispatch(setSocket(Socket));
        Socket.on('getOnlineUsers',(onlineUsers)=>{
           dispatch(setOnlineUsers(onlineUsers));
        })
        return ()=>{
            if (socket) {
          socket.close()
            }
        };
     }else{
       if(socket){
         socket.close();
         dispatch(setSocket(null));
       }
     }
  },[authUser]);
  return (
    <>
      <div className ="h-screen flex items-center justify-center">
         <RouterProvider router={router}/>
      </div>
    </>
  )
}
export default App


import { useEffect, useState } from 'react'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Homepage from './Components/Homepage'
import Signup from './Components/Signup'
import Login from './Components/Login'
import { useSelector } from 'react-redux'
import {io} from "socket.io-client" 
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
  const [socket,setSocket]=useState(null);
  const {authUser}=useSelector(store=>store.user);
  useEffect(()=>{
     if(authUser){
        const Socket=io('http://localhost:8080',{});
        setSocket(Socket);
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

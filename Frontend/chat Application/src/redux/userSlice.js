import {createSlice} from "@reduxjs/toolkit";
const userSlice=createSlice({
   name:"user",
   initialState:{
     authUser:null,
     OtherUsers:null,
     SelectedUser:null,
     OnlineUsers:null
   },
  reducers:{
      setAuthUser:(state,action)=>{
         state.authUser=action.payload;
      },
      setOtherUsers:(state,action)=>{
        state.OtherUsers=action.payload;
      },
      setSelectedUsers:(state,action)=>{
        state.SelectedUser=action.payload;
      },
      setOnlineUsers:(state,action)=>{
         state.OnlineUsers=action.payload
      }
  }
})
export const {setAuthUser,setOtherUsers,setSelectedUsers,setOnlineUsers}=userSlice.actions;
export default userSlice.reducer;
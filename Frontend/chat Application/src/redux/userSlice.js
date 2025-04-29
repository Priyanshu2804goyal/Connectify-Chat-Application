import {createSlice} from "@reduxjs/toolkit";
const userSlice=createSlice({
   name:"user",
   initialState:{
     authUser:null,
     OtherUsers:null,
     SelectedUser:null,
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
      }
  }
})
export const {setAuthUser,setOtherUsers,setSelectedUsers}=userSlice.actions;
export default userSlice.reducer;
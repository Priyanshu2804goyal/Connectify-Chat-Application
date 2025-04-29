import { createSlice } from "@reduxjs/toolkit";
const messageslice=createSlice({
    name:"message",
    initialState:{
        messages:null,
    },
    reducers:{
        setmessages:(state,action)=>{
            state.messages=action.payload;
        }
    }
});
export const{setmessages}=messageslice.actions;
export default messageslice.reducer;
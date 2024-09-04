import { createSlice } from "@reduxjs/toolkit";


const userSlice= createSlice({
    name:"app",
    initialState:{
isUserLogged:false,

user:null
    },
    reducers:{
        login:(state,action)=>{
            state.isUserLogged=true
            state.user=action.payload
        },
        logout:(state,action)=>{
            state.isUserLogged=false
            state.user=null
        }
    }
})

export default userSlice.reducer

export const {login,logout}=userSlice.actions
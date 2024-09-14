import { createSlice } from "@reduxjs/toolkit";


const sellerSlice = createSlice({
    name: "seller",
    initialState: {
        isSellerLogged: false,
        seller: null
    },
    reducers: {
        login: (state, action) => {
            state.isSellerLogged = true
            state.seller = action.payload
        },
        logout: (state, action) => {
            state.isSellerLogged = false
            state.seller = null
        },
       

    }
})

export default sellerSlice.reducer

export const { login, logout} = sellerSlice.actions
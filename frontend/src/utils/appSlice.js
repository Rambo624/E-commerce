import { createSlice } from "@reduxjs/toolkit";


const sellerSlice = createSlice({
    name: "app",
    initialState: {
        isSellerLogged: false,
        seller: null
    },
    reducers: {
        login: (state, action) => {
            state.isSellerLogged = true
            state.seller = action.payload
        },
        sellerlogout: (state, action) => {
            state.isSellerLogged = false
            state.seller = null
        },
       

    }
})

export default sellerSlice.reducer

export const { login, sellerlogout} = sellerSlice.actions
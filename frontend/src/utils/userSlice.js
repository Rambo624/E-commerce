import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "app",
    initialState: {
        isUserLogged: false,
        user: null
    },
    reducers: {
        login: (state, action) => {
            state.isUserLogged = true
            state.user = action.payload
        },
        logout: (state, action) => {
            state.isUserLogged = false
            state.user = null
        },
        addcart: (state, action) => {
            if (state.user && state.user.cart) {
                if (!state.user.cart.products) {
                    state.user.cart.products = [];
                }

                state.user.cart.products = [...state.user.cart.products, action.payload]
            }else{
                console.error("error")
            }

        }
    }
})

export default userSlice.reducer

export const { login, logout, addcart } = userSlice.actions
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isUserLogged: false,
    user: null
  },
  reducers: {
    login: (state, action) => {
      state.isUserLogged = true;
      state.user = action.payload;

      // Initialize the cart if it's not present
      if (!state.user.cart) {
        state.user.cart = { products: [] };
      }
    },
    logout: (state) => {
      state.isUserLogged = false;
      state.user = null;
    },
    addcart: (state, action) => {
      if (state.user && state.user.cart) {
        // Ensure the products array is initialized
        if (!Array.isArray(state.user.cart.products)) {
          state.user.cart.products = [];
        }

        // Add the product from action payload
        state.user.cart.products = [...state.user.cart.products, action.payload];
      } else {
        console.error("User or cart is undefined. Cannot add product to cart.");
      }
    },
    removecart: (state, action) => {
      const productId = action.payload;

      if (state.user && state.user.cart && Array.isArray(state.user.cart.products)) {
        state.user.cart.products = state.user.cart.products.filter(
          (item) => item.product !== productId
        );
      } else {
        console.error("User or cart is undefined. Cannot remove product from cart.");
      }
    },
    clearcart: (state) => {
      if (state.user && state.user.cart) {
        state.user.cart.products = [];
      } else {
        console.error("User or cart is undefined. Cannot clear cart.");
      }
    }
  }
});

export default userSlice.reducer;

export const { login, logout, addcart, removecart, clearcart } = userSlice.actions;

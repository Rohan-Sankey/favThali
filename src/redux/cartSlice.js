import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {}, 
};

const cartSlice = createSlice({
  name: "thali",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price  } = action.payload;
      if (state.cart[id]) {
        state.cart[id].quantity += 1; 
      } else {
        state.cart[id] = { id, name, price, quantity: 1 };
      }
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      if (state.cart[id]) {
        if (state.cart[id].quantity > 1) {
          state.cart[id].quantity -= 1; 
        } else {
          delete state.cart[id] ; 
        }
      }
    },
    clearCart:(state , action)=>{
      state.cart = {};

    }
  },
});

export const { addToCart, removeFromCart , clearCart } = cartSlice.actions;
export default cartSlice.reducer;

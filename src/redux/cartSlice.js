import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {}, 
};

const thaliSlice = createSlice({
  name: "thali",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price } = action.payload;
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
          delete state.cart[id]; 
        }
      }
    },
  },
});

export const { addToCart, removeFromCart } = thaliSlice.actions;
export default thaliSlice.reducer;

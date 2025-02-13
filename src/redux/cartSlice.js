import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import thaliData from "../Dishes";


const URL = "http://172.16.0.52:3000/thalis";


export const fetchDishData = createAsyncThunk("dish/fetchDishData" , async()=>{
  const response = await axios.get(URL);
  return response.data;
})

export const loadCart = createAsyncThunk("dish/loadCart" , async ()=>{
  const cart = await AsyncStorage.getItem("cart");
  return cart ? JSON.parse(cart) : {};

})


const saveCartToStorage = async (cart)=>{
  await AsyncStorage.setItem("cart" , JSON.stringify(cart));
}


const initialState = {
  cart: {}, 
  thaliData :[],
  loading : false,
  error : null
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
      saveCartToStorage(state.cart)
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
      saveCartToStorage(state.cart)
    },
    clearCart:(state , action)=>{
      state.cart = {};
      saveCartToStorage(state.cart)

    }
  },

extraReducers: (builder)=>{
  builder
  .addCase(fetchDishData.fulfilled , (state,action)=>{
    state.loading = false;
    state.thaliData = action.payload;
  })

  .addCase(fetchDishData.rejected , (state , action)=>{
    state.loading = false;
    state.error = action.error.message;
  })

  .addCase(loadCart.fulfilled, (state, action) => {
    state.cart = action.payload;
  });
}

});

export const { addToCart, removeFromCart , clearCart } = cartSlice.actions;
export default cartSlice.reducer;

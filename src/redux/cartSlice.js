import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import thaliData from '../Dishes';
import {act} from 'react';

const URL = 'http://172.16.0.66:3000/thalis';

export const fetchDishData = createAsyncThunk(
  'dish/fetchDishData',
  async () => {
    const response = await axios.get(URL);
    console.log(response.data);
    return response.data;
  },
);

export const loadCart = createAsyncThunk('dish/loadCart', async () => {
  const cart = await AsyncStorage.getItem('cart');
  return cart ? JSON.parse(cart) : {};
});

export const uploadDish = createAsyncThunk(
  'dish/uploadDish',
  async (newDish, {rejectWithValue}) => {
    try {
      const response = await axios.post(URL, newDish);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const updateDish = createAsyncThunk(
  'dish/updateDish',
  async (updateDish, {rejectWithValue}) => {
    try {
      const response = await axios.put(`${URL}/${updateDish.id}`, updateDish);
      return response.data 
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const deleteDish = createAsyncThunk(
  'dish/deleteDish',
  async (id, {rejectWithValue}) => {
    try {
      await axios.delete(`${URL}/${id}`);
      console.log(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

const saveCartToStorage = async cart => {
  await AsyncStorage.setItem('cart', JSON.stringify(cart));
};

const initialState = {
  cart: {},
  thaliData: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'thali',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const {id, name, price} = action.payload;
      if (state.cart[id]) {
        state.cart[id].quantity += 1;
      } else {
        state.cart[id] = {id, name, price, quantity: 1};
      }
      saveCartToStorage(state.cart);
    },
    removeFromCart: (state, action) => {
      const {id} = action.payload;
      if (state.cart[id]) {
        if (state.cart[id].quantity > 1) {
          state.cart[id].quantity -= 1;
        } else {
          delete state.cart[id];
        }
      }
      saveCartToStorage(state.cart);
    },
    clearCart: (state, action) => {
      state.cart = {};
      saveCartToStorage(state.cart);
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchDishData.fulfilled, (state, action) => {
        state.loading = false;
        state.thaliData = action.payload;
      })

      .addCase(fetchDishData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(loadCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })

      .addCase(uploadDish.fulfilled, (state, action) => {
        state.loading = false;
        state.thaliData.push(action.payload);
      })

      .addCase(uploadDish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteDish.fulfilled, (state, action) => {
        state.thaliData = state.thaliData.filter(
          thali => thali.id !== action.payload,
        );
      })

      .addCase(deleteDish.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(updateDish.fulfilled, (state, action) => {
        state.thaliData = state.thaliData.map(dish =>
          dish.id === action.payload.id ? action.payload : dish,
        );
      })

      .addCase(updateDish.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;

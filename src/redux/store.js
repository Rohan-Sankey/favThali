import { configureStore } from "@reduxjs/toolkit";
import thaliReducer from "./cartSlice";
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: {
    thali: thaliReducer,
  },

middleware : (getDefaultMiddleware)=>getDefaultMiddleware().concat(thunk), // redux thunk and async storage

});

export default store;

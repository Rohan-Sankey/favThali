import { configureStore } from "@reduxjs/toolkit";
import thaliReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    thali: thaliReducer,
  },
});

export default store;

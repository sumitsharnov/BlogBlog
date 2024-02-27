// store.js
import { configureStore } from "@reduxjs/toolkit";
import  userReducer from './user/userSlice'

// Define initial state

// Create Redux store
const store = configureStore({
  reducer: {
    user: userReducer
  }
});

export default store;

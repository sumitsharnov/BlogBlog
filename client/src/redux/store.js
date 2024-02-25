// store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  signUpSuccess: false,
  signInSuccess: false,
};

// Define slice to manage state and actions
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    signUpSuccess(state) {
      return {
        ...state,
        signUpSuccess: true,
      };
    },
    clearSignUpSuccess(state) {
      return {
        ...state,
        signUpSuccess: false,
      };
    },

    signInSuccess(state) {
      return {
       ...state,
        signInSuccess: true,
      };
    },
    clearSignInSuccess(state) {
      return {
       ...state,
        signInSuccess: false,
      };
    },
  },
});

// Create Redux store
const store = configureStore({
  reducer: appSlice.reducer,
});

export const { signUpSuccess, clearSignUpSuccess, signInSuccess, clearSignInSuccess } = appSlice.actions;
export default store;

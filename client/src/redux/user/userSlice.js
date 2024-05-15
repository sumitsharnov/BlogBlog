import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    signUpSuccess: false,
    signInSuccess: false,
    currentUser: null,
    token: null,
  };
  
  // Define slice to manage state and actions
  const userSlice = createSlice({
    name: "user",
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
  
      signInSuccess(state, action) {
        return {
         ...state,
          currentUser :action.payload,
          token: action.payload.token,
          signInSuccess: true,
        };
      },
      clearSignInSuccess(state) {
        return {
         ...state,
          signInSuccess: false,
          currentUser: null,
          token: null
        };
      },

      updateCurrentUser(state, action) { 
        return {
         ...state,
          currentUser :action.payload,
          token: action.payload.token,
        };
      }, 
    },
  });

  export const { signUpSuccess, clearSignUpSuccess, signInSuccess, clearSignInSuccess, updateCurrentUser } = userSlice.actions;
  export default userSlice.reducer;
  
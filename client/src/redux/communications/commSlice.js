import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messageId: "",
    activatedMessage: ""
  };

const commSlice = createSlice({
    name:"comm",
    initialState,
    reducers:{
        setMessageId(state,action){
            state.messageId = action.payload;
        },
        setActiveMessage(state,action){
            state.activatedMessage = action.payload;
        }
    }
});

export const {setMessageId, setActiveMessage} = commSlice.actions;

export default commSlice.reducer;
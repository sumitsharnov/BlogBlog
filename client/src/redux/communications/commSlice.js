import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messageId: "",
    activatedMessage: "",
    replyId: ""
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
        },
        setReplyId(state,action){
            state.replyId = action.payload;
        }
    }
});

export const {setMessageId, setActiveMessage, setReplyId} = commSlice.actions;

export default commSlice.reducer;
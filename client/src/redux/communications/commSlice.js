import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messageId: "",
    activatedMessage: "",
    replyId: "",
    messageThread: "",
    communicationUserId : ""
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
        },
        setMessageThread(state,action){
            state.messageThread = action.payload;
        },
        setCommunicationUserId(state,action){
            state.communicationUserId = action.payload;
        }
    }
});

export const {setMessageId, setActiveMessage, setReplyId, setMessageThread, setCommunicationUserId} = commSlice.actions;

export default commSlice.reducer;
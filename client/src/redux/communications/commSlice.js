import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messageId: "",
  activatedMessage: "",
  replyId: "",
  messageThread: "",
  communicationUserId: "",
  showMessagesToAdmin: false,
  loading: false,
  errorText: "",
  unreadRepliesCount: 0,
  unreadMessagesCount: 0,
  newMessage :  "",
};

const commSlice = createSlice({
  name: "comm",
  initialState,
  reducers: {
    setMessageId(state, action) {
      state.messageId = action.payload;
    },
    setActiveMessage(state, action) {
      state.activatedMessage = action.payload;
    },
    setReplyId(state, action) {
      state.replyId = action.payload;
    },
    setMessageThread(state, action) {
      state.messageThread = action.payload;
    },
    setMessageThreadInit(state) {
      state.messageThread = "";
    },
    setCommunicationUserId(state, action) {
      state.communicationUserId = action.payload;
    },
    setShowMessagesToAdmin(state, action) {
      state.showMessagesToAdmin = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setErrorText(state, action) {
      state.errorText = action.payload;
    },
    setUnreadRepliesCount(state, action) {
      state.unreadRepliesCount = action.payload;
    },
    setUnreadMessagesCount(state, action) {
      state.unreadMessagesCount = action.payload;
    },
    setNewMessage(state, action) {
      state.newMessage = action.payload;
    },
    resetComm() {
      return initialState;
    }
  },
});

export const {
  setMessageId,
  setActiveMessage,
  setReplyId,
  setMessageThread,
  setCommunicationUserId,
  setShowMessagesToAdmin,
  setLoading,
  setErrorText,
  setMessageThreadInit,
  setUnreadRepliesCount,
  setUnreadMessagesCount,
  setNewMessage,
  resetComm,
} = commSlice.actions;

export default commSlice.reducer;

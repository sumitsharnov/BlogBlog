"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.resetComm = exports.setUnreadMessagesCount = exports.setUnreadRepliesCount = exports.setMessageThreadInit = exports.setErrorText = exports.setLoading = exports.setShowMessagesToAdmin = exports.setCommunicationUserId = exports.setMessageThread = exports.setReplyId = exports.setActiveMessage = exports.setMessageId = void 0;

var _toolkit = require("@reduxjs/toolkit");

var initialState = {
  messageId: "",
  activatedMessage: "",
  replyId: "",
  messageThread: "",
  communicationUserId: "",
  showMessagesToAdmin: false,
  loading: false,
  errorText: "",
  unreadRepliesCount: 0,
  unreadMessagesCount: 0
};
var commSlice = (0, _toolkit.createSlice)({
  name: "comm",
  initialState: initialState,
  reducers: {
    setMessageId: function setMessageId(state, action) {
      state.messageId = action.payload;
    },
    setActiveMessage: function setActiveMessage(state, action) {
      state.activatedMessage = action.payload;
    },
    setReplyId: function setReplyId(state, action) {
      state.replyId = action.payload;
    },
    setMessageThread: function setMessageThread(state, action) {
      state.messageThread = action.payload;
    },
    setMessageThreadInit: function setMessageThreadInit(state) {
      state.messageThread = "";
    },
    setCommunicationUserId: function setCommunicationUserId(state, action) {
      state.communicationUserId = action.payload;
    },
    setShowMessagesToAdmin: function setShowMessagesToAdmin(state, action) {
      state.showMessagesToAdmin = action.payload;
    },
    setLoading: function setLoading(state, action) {
      state.loading = action.payload;
    },
    setErrorText: function setErrorText(state, action) {
      state.errorText = action.payload;
    },
    setUnreadRepliesCount: function setUnreadRepliesCount(state, action) {
      state.unreadRepliesCount = action.payload;
    },
    setUnreadMessagesCount: function setUnreadMessagesCount(state, action) {
      state.unreadMessagesCount = action.payload;
    },
    resetComm: function resetComm() {
      return initialState;
    }
  }
});
var _commSlice$actions = commSlice.actions,
    setMessageId = _commSlice$actions.setMessageId,
    setActiveMessage = _commSlice$actions.setActiveMessage,
    setReplyId = _commSlice$actions.setReplyId,
    setMessageThread = _commSlice$actions.setMessageThread,
    setCommunicationUserId = _commSlice$actions.setCommunicationUserId,
    setShowMessagesToAdmin = _commSlice$actions.setShowMessagesToAdmin,
    setLoading = _commSlice$actions.setLoading,
    setErrorText = _commSlice$actions.setErrorText,
    setMessageThreadInit = _commSlice$actions.setMessageThreadInit,
    setUnreadRepliesCount = _commSlice$actions.setUnreadRepliesCount,
    setUnreadMessagesCount = _commSlice$actions.setUnreadMessagesCount,
    resetComm = _commSlice$actions.resetComm;
exports.resetComm = resetComm;
exports.setUnreadMessagesCount = setUnreadMessagesCount;
exports.setUnreadRepliesCount = setUnreadRepliesCount;
exports.setMessageThreadInit = setMessageThreadInit;
exports.setErrorText = setErrorText;
exports.setLoading = setLoading;
exports.setShowMessagesToAdmin = setShowMessagesToAdmin;
exports.setCommunicationUserId = setCommunicationUserId;
exports.setMessageThread = setMessageThread;
exports.setReplyId = setReplyId;
exports.setActiveMessage = setActiveMessage;
exports.setMessageId = setMessageId;
var _default = commSlice.reducer;
exports["default"] = _default;
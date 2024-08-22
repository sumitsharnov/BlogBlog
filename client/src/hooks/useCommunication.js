import { useSelector, useDispatch } from "react-redux";
import {
  postMessage,
  getMessages,
  postReply,
  getRepliesByMessageId,
  postEditMessage,
  postEditReply,
  markAsRead,
  markReplyAsRead,
} from "../services/communication_api";
import { useEffect, useState } from "react";
import anonuser from "../images/home/anonuser.png";
import { getUserInfo } from "../services/user_api";
import {
  setActiveMessage,
  setReplyId,
  setMessageThread,
  setLoading,
  setErrorText,
  setShowMessagesToAdmin,
  setNewMessage,
  setReplyThread
} from "../redux/communications/commSlice";

export const useCommunication = () => {
  const [showReplies, setShowReplies] = useState(false);
  const [count, setCount] = useState(0);
  const { currentUser, token } = useSelector((state) => state.user);
  const { messageId, activatedMessage, communicationUserId, messageThread } =
    useSelector((state) => state.comm);
  const [message, setMessage] = useState([]);
  const [user, setUser] = useState(null);
  const [userImage, setUserImage] = useState(anonuser);
  const [newReply, setNewReply] = useState("");
  const [postedMessage, setPostedMessage] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editReply, setEditReply] = useState(false);
  const [editMessage, setEditMessage] = useState("");
  const [editReplyText, setEditReplyText] = useState("");
  const [sync, setSync] = useState(false);
  const dispatch = useDispatch();

  const handleReplies = async (messageId, replyThreadNull = false) => {
    dispatch(setErrorText(""));
    setShowReplies(true);
    replyThreadNull || dispatch(setReplyThread(null));
    dispatch(setActiveMessage(messageId));
    setCount(count + 1);
    // const data = await getMessagesById(messageId, token);
    try {
      const replies = await getRepliesByMessageId(messageId, token);
      (await replies) && dispatch(setReplyThread(replies));

      setPostedMessage(true);
    } catch (error) {
      dispatch(setErrorText(error.message));
      dispatch(setReplyThread([]));
    }
  };

  //This is to get whether user has started the edit process, if yes, then we set it to true
  const handleEdit = async (messageId, message) => {
    setEdit(true);
    setEditMessage(message);
    dispatch(setActiveMessage(messageId));
  };

  const handleReplyEdit = async (replyId, defaultText) => {
    setEditReply(true);
    setEditReplyText(defaultText);
    dispatch(setLoading(false));
  };

  //To save the main message after editing
  const handleEditSave = async (messageId, message) => {
    try {
      message === editMessage && setEdit(false);
      dispatch(setActiveMessage(""));
      message !== editMessage &&
        (await postEditMessage(messageId, token, editMessage));
      await getAllMessages();
      setEdit(false);
      // setShowReplies(false);
    } catch (error) {
      dispatch(setErrorText(error.message));
    }
  };

  // To save a reply after editing
  const handleEditReplySave = async (replyId) => {
    try {
      setEditReply(false);
      dispatch(setLoading(true));
      const res = await postEditReply(replyId, token, editReplyText, messageId);
      res && (await handleReplies(messageId));
      dispatch(setLoading(false));

      dispatch(setReplyId(""));
    } catch (error) {
      dispatch(setErrorText(error.message));
    }
  };

  // Post a message - main message
  const handleSubmit = async () => {
    if (message.trim().length <= 0) {
      dispatch(setErrorText("Message cannot be empty"));
      setCount(count + 1);
      
      return;
    }
    try {
      dispatch(setErrorText(""));
      setCount(count + 1);
      await postMessage(communicationUserId, currentUser._id, token, message.trim());
      dispatch(setErrorText(null));
      setMessage([""]);
      await getAllMessages(true, false);
    } catch (error) {
      dispatch(setErrorText(error.message));
    }
  };

  const postAReply = async () => {
    try {
      setNewReply([""]);
      dispatch(setErrorText(""));
      dispatch(setLoading(true));
      await postReply(newReply, token, messageId, currentUser._id);
      await handleReplies(messageId);
      dispatch(setErrorText(null));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setErrorText(error.message));
    }
  };

  const clearReplyText = async () => {
    setNewReply([""]);
  };

  const getAllMessages = async (loading = false, syncing = true) => {
    try {
      dispatch(setNewMessage(""));
      dispatch(setLoading(loading));
      dispatch(setErrorText(""));
      setCount(count + 1);
      setSync(syncing);
      const data = await getMessages(
        communicationUserId || currentUser._id,
        token
      );
      if (data) {
        dispatch(setMessageThread(data.messages));
        setUser(data.user);
        setUserImage((data.user && data.user[0].photoURL) || anonuser);
      } else {
        dispatch(setMessageThread(""));
      }
      dispatch(setLoading(false));
      setSync(false);
    } catch (error) {
      dispatch(setErrorText(error.message));
      dispatch(setLoading(false));
      setSync(false);
    }
  };

  const getUserDetails = async (id, token) => {
    try {
      const res = await getUserInfo(currentUser._id, token);
      const userInfo = await res.json();
      setUser(userInfo);
    } catch (error) {
      dispatch(setErrorText(error.message));
    }
  };

  // const getUnreadRepliesByMessageId = async (id, token) => {
  //   try {
  //     const res = await getUserInfo(currentUser._id, token);
  //     const userInfo = await res.json();
  //     setUser(userInfo);
  //   } catch (error) {
  //     dispatch(setErrorText(error.message));
  //   }
  // };

  useEffect(() => {
    getAllMessages(true, true);
  }, []);

  const handleCancelEdit = () => {
    setEdit(false);
    showReplies || dispatch(setActiveMessage(""));
  };

  const handleCancelReplyEdit = () => {
    setEditReply(false);
    dispatch(setReplyId(""));
  };
  const backToCommUsers = () => {
    dispatch(setShowMessagesToAdmin(false));
    dispatch(setMessageThread(""));
  };


  const markMessageAsRead = async (msgId) => {
    try{
      setCount(prev => prev + 1);
      await markAsRead(token, msgId);
      dispatch(setErrorText(null));
      await getAllMessages(false, false);
      
    }catch (error) {
      dispatch(setErrorText(error.message));
    }
  };

  const markReplyRead = async (replyId,msgId, token) => {
    try{
      setCount(prev => prev + 1);
      await markReplyAsRead(replyId, msgId, token);
      dispatch(setErrorText(null));
      await handleReplies(msgId, true);
    }catch (error) {
      dispatch(setErrorText(error.message));
    }
  };

  return {
    token,
    messageId,
    handleReplies,
    showReplies,
    setShowReplies,
    handleSubmit,
    count,
    setCount,
    message,
    setMessage,
    userImage,
    user,
    getUserDetails,
    newReply,
    setNewReply,
    postAReply,
    clearReplyText,
    postedMessage,
    activatedMessage,
    handleEdit,
    edit,
    handleEditSave,
    setEditMessage,
    editMessage,
    handleCancelEdit,
    handleReplyEdit,
    editReply,
    editReplyText,
    setEditReplyText,
    handleCancelReplyEdit,
    handleEditReplySave,
    getAllMessages,
    messageThread,
    setMessageThread,
    backToCommUsers,
    markMessageAsRead,
    markReplyRead,
    sync,
    setSync
  };
};

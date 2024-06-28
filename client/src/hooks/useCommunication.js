import { useSelector, useDispatch } from "react-redux";
import {
  postMessage,
  getMessages,
  postReply,
  getRepliesByMessageId,
  postEditMessage,
  postEditReply,
} from "../services/communication_api";
import { useEffect, useState } from "react";
import anonuser from "../images/home/anonuser.png";
import { getUserInfo } from "../services/user_api";
import {
  setActiveMessage,
  setReplyId,
  setMessageThread
} from "../redux/communications/commSlice";

export const useCommunication = () => {
  const [replyThread, setReplyThread] = useState(null);
  const [showReplies, setShowReplies] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [count, setCount] = useState(0);
  const { currentUser, token } = useSelector((state) => state.user);
  const { messageId, activatedMessage, communicationUserId } = useSelector((state) => state.comm);
  const [message, setMessage] = useState([]);
  const [user, setUser] = useState(null);
  const [userImage, setUserImage] = useState(anonuser);
  const [loading, setLoading] = useState(false);
  const [newReply, setNewReply] = useState("");
  const [postedMessage, setPostedMessage] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editReply, setEditReply] = useState(false);
  const [editMessage, setEditMessage] = useState("");
  const [editReplyText, setEditReplyText] = useState("");
  const dispatch = useDispatch();

  const handleReplies = async (messageId) => {
    setErrorMessage("");
    setShowReplies(true);
    setReplyThread(null);
    dispatch(setActiveMessage(messageId));
    setCount(count+1);
    // const data = await getMessagesById(messageId, token);
    try {
      const replies = await getRepliesByMessageId(messageId, token);
      (await replies) && setReplyThread(replies);

      setPostedMessage(true);
    } catch (error) {
      setErrorMessage(error.message);
      setReplyThread([]);
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
    setLoading(false);
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
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // To save a reply after editing
  const handleEditReplySave = async (replyId) => {
    try {
      setEditReply(false);
      setLoading(true);
      const res = await postEditReply(replyId, token, editReplyText, messageId);
      res && (await handleReplies(messageId));
      setLoading(false);
      dispatch(setReplyId(""));
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Post a message - main message
  const handleSubmit = async () => {
    if (message.length <= 0) {
      setErrorMessage("Message cannot be empty");
      setCount(count + 1);
      return;
    }
    try {
      setErrorMessage("");
      setCount(count + 1);
      await postMessage(communicationUserId, currentUser._id, token, message);
      setErrorMessage(null);
      setMessage([""]);
      await getAllMessages();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const postAReply = async () => {
    try {
      setNewReply([""]);
      setErrorMessage("");
      setLoading(true);
      await postReply(newReply, token, messageId, currentUser._id);
      await handleReplies(messageId);
      setErrorMessage(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  const clearReplyText = async () => {
    setNewReply([""]);
  };

  const getAllMessages = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      setCount(count + 1);
      const data = await getMessages(communicationUserId || currentUser._id, token);
      if (data) {
        dispatch(setMessageThread(data.messages));
        setUser(data.user);
        setUserImage((data.user && data.user[0].photoURL) || anonuser);
      }
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  const getUserDetails = async (id, token) => {
    try {
      const res = await getUserInfo(currentUser._id, token);
      const userInfo = await res.json();
      setUser(userInfo);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  const handleCancelEdit = () => {
    setEdit(false);
    showReplies || dispatch(setActiveMessage(""));
  };

  const handleCancelReplyEdit = () => {
    setEditReply(false);
    dispatch(setReplyId(""));
  };

  return {
    handleReplies,
    showReplies,
    setShowReplies,
    replyThread,
    handleSubmit,
    errorMessage,
    setErrorMessage,
    count,
    setCount,
    message,
    setMessage,
    loading,
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
    getAllMessages
  };
};

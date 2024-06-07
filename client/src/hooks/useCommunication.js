import { useSelector, useDispatch } from "react-redux";
import {
  postMessage,
  getMessages,
  postReply,
  getRepliesByMessageId,
} from "../services/communication_api";
import { useEffect, useState } from "react";
import anonuser from "../images/home/anonuser.png";
import { getUserInfo } from "../services/user_api";
import { setActiveMessage } from "../redux/communications/commSlice";

export const useCommunication = () => {
  const [replyThread, setReplyThread] = useState(null);
  const [showReplies, setShowReplies] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [count, setCount] = useState(0);
  const { currentUser, token } = useSelector((state) => state.user);
  const { messageId, activatedMessage } = useSelector((state) => state.comm);
  const [message, setMessage] = useState([]);
  const [messageThread, setMessageThread] = useState("");
  const messageEntries = Object.entries(messageThread).reverse();
  const [user, setUser] = useState(null);
  const [userImage, setUserImage] = useState(anonuser);
  const [loading, setLoading] = useState(false);
  const [newReply, setNewReply] = useState("");
  const [postedMessage, setPostedMessage] = useState(false);
  const dispatch = useDispatch();
  
  
  const handleReplies = async (messageId) => {
    setShowReplies(true);
    setReplyThread(null);
    dispatch(setActiveMessage(messageId));
    // const data = await getMessagesById(messageId, token);
    try {
      const replies = await getRepliesByMessageId(messageId, token);
      replies && setReplyThread(replies.reverse());
      setCount(count+ 1);
      setPostedMessage(true);
    } catch (error) {
      setReplyThread([]);
    }
  };

  const handleSubmit = async () => {
    if (message.length <= 0) {
      setErrorMessage("Message cannot be empty");
      setCount(count + 1);
      return;
    }
    try {
      setErrorMessage("");
      setCount(count + 1);
      await postMessage(currentUser._id, token, message);
      setErrorMessage(null);
      setMessage([""]);
      await getAllMessages();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const postAReply = async () => {
    try {
      setPostedMessage(false);
      setLoading(true);
      setErrorMessage("");
      setCount(count + 1);
      await postReply(newReply, token, messageId);
      await handleReplies(messageId);
      setErrorMessage(null);
      setNewReply([""]);
      setLoading(false);
    } catch (error) {
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
      const data = await getMessages(currentUser._id, token);
      if (data) {
        setMessageThread(data.messages);
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

  const handleErrorImage = (event) => {
    setErrorMessage("Failed to load profile picture, please try again later");
    setCount(count + 1);
    console.log(event);
    setUserImage(anonuser);
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
    messageEntries,
    user,
    handleErrorImage,
    getUserDetails,
    newReply,
    setNewReply,
    postAReply,
    clearReplyText,
    postedMessage,
    activatedMessage,
  };
};

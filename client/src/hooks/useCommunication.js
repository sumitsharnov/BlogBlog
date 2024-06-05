import { useSelector } from "react-redux";
import {
  postMessage,
  getMessages,
  getMessagesById,
} from "../services/communication_api";
import { useEffect, useState } from "react";
import anonuser from "../images/home/anonuser.png";
import { getUserInfo } from "../services/user_api";

export const useCommunication = () => {
  const [replyThread, setReplyThread] = useState(null);
  const [showReplies, setShowReplies] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [count, setCount] = useState(0);
  const { currentUser, token } = useSelector((state) => state.user);
  const [message, setMessage] = useState([]);
  const [messageThread, setMessageThread] = useState("");
  const messageEntries = Object.entries(messageThread).reverse();
  const [user, setUser] = useState(null);
  const [userImage, setUserImage] = useState(anonuser);
  const [loading, setLoading] = useState(false);
  const [newReply, setNewReply] = useState("");;

  const handleReplies = async (messageId) => {
    setShowReplies(true);
    setReplyThread(null);
    const data = await getMessagesById(messageId, token);
    setReplyThread(data.messages);
   
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
      postMessage(currentUser._id, token, message);
      setErrorMessage(null);
      setMessage([""]);
      await getAllMessages();
    } catch (error) {
      setErrorMessage(error.message);
    }
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
  }

  useEffect(() => {
    getAllMessages();
  }, []);

  const handleErrorImage = (event) => {
    setErrorMessage("Failed to load profile picture, please try again later")
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
  };
};

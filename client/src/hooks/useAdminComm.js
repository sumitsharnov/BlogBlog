import { useState } from "react";
import { getUsersCommunicated as getCommunicationsUsers } from "../services/admin_comm_api";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useCommunication } from "./useCommunication";

//https://ui.aceternity.com/components/following-pointer
export const useAdminComm = () => {
  const { getAllMessages, messageEntries } = useCommunication();
  const { currentUser, token } = useSelector((state) => state.user);
  const [commUsers, setCommUsers] =  useState([]);
  const [showMessagesToAdmin, setShowMessagesToAdmin] = useState(false);
  const getUsersCommunicated = async () => {
    const res = await getCommunicationsUsers(token);
    setCommUsers(await res);
  };

  useEffect(() => {
    getUsersCommunicated();
  }, []);

  const selectedComm = async () =>{
    console.log("selected")
    await getAllMessages(commUsers[0]._id);
    setShowMessagesToAdmin(true);
  }


  return {
    getUsersCommunicated,
    commUsers,
    currentUser,
    token,
    selectedComm,
    showMessagesToAdmin,
    messageEntries
  };
};

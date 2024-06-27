import { useState } from "react";
import { getUsersCommunicated as getCommunicationsUsers } from "../services/admin_comm_api";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useCommunication } from "./useCommunication";
import { setMessageThread, setCommunicationUserId } from "../redux/communications/commSlice";

//https://ui.aceternity.com/components/following-pointer
export const useAdminComm = () => {
  const dispatch = useDispatch();
  const { getAllMessages, messageEntries } = useCommunication();
  const { currentUser, token } = useSelector((state) => state.user);
  const [commUsers, setCommUsers] =  useState([]);
  const [showMessagesToAdmin, setShowMessagesToAdmin] = useState(false);
  const getUsersCommunicated = async () => {
    const res = await getCommunicationsUsers(token);
    console.log(res, "Sumit")
    setCommUsers(res);
  };

  useEffect(() => {
    getUsersCommunicated();
  }, []);

  const selectedComm = async () =>{
    console.log(commUsers, "Right")
    dispatch(setCommunicationUserId(commUsers[1]._id))
    const res = await getAllMessages();
    console.log(res, "Selected", commUsers[0]._id)
    dispatch(setMessageThread(res))
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

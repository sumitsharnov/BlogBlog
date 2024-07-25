import { useState } from "react";
import { getUsersCommunicated as getCommunicationsUsers } from "../services/admin_comm_api";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useCommunication } from "./useCommunication";
import { setCommunicationUserId, setShowMessagesToAdmin, setLoading, setMessageThread} from "../redux/communications/commSlice";

//https://ui.aceternity.com/components/following-pointer
export const useAdminComm = () => {
  const dispatch = useDispatch();
  const { messageEntries, setSync } = useCommunication();
  const { currentUser, token } = useSelector((state) => state.user);
  const [commUsers, setCommUsers] =  useState([]);
  const getUsersCommunicated = async () => {
    try{
      dispatch(setLoading(true)); 
      const res = await getCommunicationsUsers(token);
      setCommUsers(res);
      dispatch(setLoading(false)); 
    }catch(err){
      console.error(err);
      dispatch(setLoading(false));  // Unset loading state on error.  
    }
    
  };


  useEffect(() => {
    getUsersCommunicated();
  }, []);

  const selectedComm = async (userID) =>{
    setSync(true);
    dispatch(setLoading(true));
    dispatch(setMessageThread([]));  // Clear any existing messages.
    dispatch(setCommunicationUserId(userID))
    dispatch(setShowMessagesToAdmin(true));
    // dispatch(setLoading(false));
  }


  return {
    getUsersCommunicated,
    commUsers,
    currentUser,
    token,
    selectedComm,
    messageEntries,
  };
};

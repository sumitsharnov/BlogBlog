import { useState } from "react";
import { getUsersCommunicated as getCommunicationsUsers } from "../services/admin_comm_api";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useCommunication } from "./useCommunication";
import { setCommunicationUserId, setShowMessagesToAdmin, setLoading} from "../redux/communications/commSlice";

//https://ui.aceternity.com/components/following-pointer
export const useAdminComm = () => {
  const dispatch = useDispatch();
  const { messageEntries } = useCommunication();
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
      dispatch(setLoading(false));  // Unset loading state on error.  This is just a placeholder, in a real app you'd want to handle the error more gracefully.  For example, you might want to display an error message or retry the request.  The loading state should be managed in your main component or in a higher-level component that manages the state of all the sub-components.  This is just a simple example to demonstrate how you might handle errors in this context.  In a real app, you'd want to handle errors in a more robust and controlled manner.  You'd also want to log errors to a server for further analysis.  For example, you might use the `console.error()` method to log the error to the console and then send it to your server using a service like Sentry.io or Rollbar.io.  You'd also want to set a timeout for the fetch request to
    }
    
  };


  useEffect(() => {
    getUsersCommunicated();
  }, []);

  const selectedComm = async (userID) =>{
    dispatch(setLoading(true));
    dispatch(setCommunicationUserId(userID))
    dispatch(setShowMessagesToAdmin(true));
    dispatch(setLoading(false));
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

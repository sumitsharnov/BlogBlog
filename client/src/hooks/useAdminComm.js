import { useState } from "react";
import { getUsersCommunicated as getCommunicationsUsers } from "../services/admin_comm_api";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const useAdminComm = () => {
  const { currentUser, token } = useSelector((state) => state.user);
  const [commUsers, setCommUsers] =  useState([]);
  const getUsersCommunicated = async () => {
    const res = await getCommunicationsUsers(token);
    setCommUsers(await res);
  };

  useEffect(() => {
    getUsersCommunicated();
  }, []);

  return {
    getUsersCommunicated,
    commUsers,
    currentUser,
    token,
  };
};

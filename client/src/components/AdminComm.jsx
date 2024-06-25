import { useAdminComm } from "../hooks/useAdminComm";
const AdminComm = () => {
  const { getUsersCommunicated, commUsers } = useAdminComm();
  console.log(commUsers, "Sumit");
  return <div onClick={getUsersCommunicated}>
    This is button
  </div>;
};

export default AdminComm;

import { useAdminComm } from "../hooks/useAdminComm";
import Communication from "../pages/Communication";
const AdminComm = () => {
  const { getUsersCommunicated, commUsers, selectedComm, showMessagesToAdmin } =
    useAdminComm();
  console.log(showMessagesToAdmin, "Sumitfd,ngkdlfng");
  console.log(commUsers, "Sumit");
  return (
    showMessagesToAdmin ? < Communication showMessagesToAdmin = {showMessagesToAdmin}/> : <div onClick={selectedComm}>This is button</div>
  )

};

export default AdminComm;

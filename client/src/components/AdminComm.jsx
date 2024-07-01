import { useAdminComm } from "../hooks/useAdminComm";
import Communication from "../pages/Communication";
import Loader from "./Loader";
import { useSelector } from "react-redux";

const AdminComm = () => {
  const { commUsers, selectedComm, showMessagesToAdmin } = useAdminComm();
  const { loading } = useSelector((state) => state.comm);

  return loading ? (
    <Loader />
  ) : (
    <div>
      {showMessagesToAdmin ? (
        <Communication />
      ) : (
        commUsers &&
        commUsers.map((user) => {
          return (
            <div onClick={() => selectedComm(user._id)} key={user._id}>
              {user.firstName}
            </div>
          );
        })
      )}
    </div>
  );
};

export default AdminComm;

import{ useSelector, useDispatch } from "react-redux";
import { clearSignInSuccess } from "../redux/user/userSlice";

export default function Home() {
  const signInSuccess = useSelector((state) => state.user.signInSuccess);
  const dispatch = useDispatch();
  return (
    <>
    <div>Logged in</div>
     {signInSuccess && <button onClick={() => dispatch(clearSignInSuccess())}>Clear</button>}
    </>
   
  )
}

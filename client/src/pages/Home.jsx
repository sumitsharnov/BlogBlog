import{ useSelector, useDispatch } from "react-redux";
import { clearSignInSuccess } from "../redux/user/userSlice";
import SignIn from "./SignIn";

export default function Home() {
  const signInSuccess = useSelector((state) => state.user.signInSuccess);
  const dispatch = useDispatch();
  console.log(signInSuccess, "sumit")
  return (
    <>
     {signInSuccess ? <div>Dashboard</div> : <SignIn />}
     <button onClick={() => dispatch(clearSignInSuccess())}>Clear</button>
    </>
   
  )
}

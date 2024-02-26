import{ useSelector, useDispatch } from "react-redux";
import { clearSignInSuccess } from "../redux/store";

export default function Home() {
  const signInSuccess = useSelector((state) => state.signInSuccess);
  const dispatch = useDispatch();
  return (
    <>
     {signInSuccess ? <div>Dashboard</div> : <div>Home</div>}
     <button onClick={() => dispatch(clearSignInSuccess())}>Clear</button>
    </>
   
  )
}

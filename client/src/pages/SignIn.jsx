import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { clearSignUpSuccess } from "./../redux/store";
import MessagesCentre from "../components/MessagesCentre";
import { useLocation } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("Sumit");
  const signUpSuccess = useSelector((state) => state.signUpSuccess);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source");

  // Use a ref to track if the component is mounted
  const isMountedRef = useRef(false);

  // Run only once after the initial render to dispatch clearSignUpSuccess
  useEffect(() => {
    if (!isMountedRef.current && source !== "signup") {
      dispatch(clearSignUpSuccess());
    }
    // Set the isMountedRef to true after the first render
    isMountedRef.current = true;
  }, []); // Empty dependency array to run the effect only once after the initial render

  const handleChange = () => {
    console.log("handleChange");
    setName("Amit");
    console.log(signUpSuccess);
  };

  return (
    <div>
      {signUpSuccess && (
        <MessagesCentre messageText={"Sign-up successful!"} type="success" />
      )}
      <button onClick={handleChange}>{name}</button>
      Sumit
    </div>
    // Sign-in form and logic...
  );
};

export default SignIn;

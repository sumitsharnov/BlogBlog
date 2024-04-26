import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MessagesCentre from "../components/MessagesCentre";
export default function ViaGoogleLogin() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loginCount, setLoginCount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth(app);
  const handleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/google/googleauth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/?source=signin");
      } else {
        setErrorMessage(res.Message);
      }
    } catch (error) {
      setLoginCount(loginCount + 1);
      setErrorMessage("Something went wrong");
    }
  };
  return (
    <>
      <button type="button" onClick={handleClick}>
        {/* Google Icon */}
        <svg
          className="w-[24px] h-[24px] bg-slate-300 border rounded-md p-[2px] hover:bg-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="red" />
              <stop offset="40%" stopColor="yellow" />
              <stop offset="70%" stopColor="green" />
              <stop offset="100%" stopColor="blue" />
            </linearGradient>
          </defs>
          <path
            fill="url(#gradient)"
            d="M12 22a10 10 0 0 1-7.1-3A9.9 9.9 0 0 1 5 4.8C7 3 9.5 2 12.2 2h.2c2.4 0 4.8 1 6.6 2.6l-2.5 2.3a6.2 6.2 0 0 0-4.2-1.6c-1.8 0-3.5.7-4.8 2a6.6 6.6 0 0 0-.1 9.3c1.2 1.3 2.9 2 4.7 2h.1a6 6 0 0 0 4-1.1c1-.9 1.8-2 2.1-3.4v-.2h-6v-3.4h9.6l.1 1.9c-.1 5.7-4 9.6-9.7 9.6H12Z"
          />
        </svg>
      </button>
      {errorMessage && (
        <MessagesCentre
          messageText={errorMessage}
          type="error"
          click={loginCount}
          top={16}
          mt={0}
        />
      )}
    </>
  );
}

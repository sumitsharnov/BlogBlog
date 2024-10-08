import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef, useCallback } from "react";
import { clearSignUpSuccess, signInSuccess } from "./../redux/user/userSlice";
import { useNavigate, Link } from "react-router-dom";
import MessagesCentre from "../components/MessagesCentre";
import { useLocation } from "react-router-dom";
import Input from "../components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import img1 from "../images/sign-up/img1.jpg";
import img2 from "../images/sign-up/img2.jpg";
import img3 from "../images/sign-up/img3.jpg";
import img4 from "../images/sign-up/img4.jpg";
import img5 from "../images/sign-up/img5.jpg";
import { Carousel } from "flowbite-react";
import { Button } from "flowbite-react";
import Loader from "../components/Loader";
import ViaGoogleLogin from "../components/GoogleAuth";
import { handleGuestLogin, handleSignIn } from "../services/signin_api";
import Cookies from "js-cookie";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import Home from "./Home";
import {
  setCommunicationUserId
} from "../redux/communications/commSlice";



const SignIn = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signUpSuccess = useSelector((state) => state.user.signUpSuccess);
  const isSignedIn = useSelector((state) => state.user.signInSuccess);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source");
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showSignUpSuccess, setShowSignUpSuccess] = useState(false); // New state to manage showing sign-up success message
  const [guest, setGuest] = useState(false);
  const [message] = useState(Cookies.get("timeout"));
  Cookies.set("timeout", "");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [guestFormData, setGuestFormData] = useState({
    name: "",
    recruiter: false,
  });

  useEffect(() => {
    if (signUpSuccess && source === "signup") {
      setShowSignUpSuccess(true); // Show sign-up success message only if coming from sign-up page
      dispatch(clearSignUpSuccess());
    }
  }, [signUpSuccess, source, dispatch]);

  // Clear the sign-up success message when the component unmounts
  useEffect(() => {
    return () => {
      setShowSignUpSuccess(false);
    };
  }, []);
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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  
  const guestInfoChange = (e) => {
    const { id, value, type, checked } = e.target;
    setGuestFormData({
      ...guestFormData,
      [id]: type === "checkbox" ? checked : value,
    });
  };
  const handleSubmit = useCallback(
    async (e) => {
      e && e.preventDefault();
      setGuest(false);
      setKey((prev) => prev + 1);
      setIsSubmitted(true);
      setLoading(true);
      setErrorMessage(null);
      setShowSignUpSuccess(false);
      try {
        const res = await (guest
          ? handleGuestLogin(guestFormData)
          : handleSignIn(formData));
        const data = await res.json();
        if (!res.ok) {
          await handleErrorReponse(data.message);
        } else {
          dispatch(signInSuccess(data));
          dispatch(setCommunicationUserId(data._id));
          navigate("/?source=signin");
        }
      } catch (error) {
        setIsSubmitted(false);
        setErrorMessage("Something went wrong");
      }

      setLoading(false);
    },
    [
      formData,
      guestFormData,
      dispatch,
      navigate,
      setKey,
      setIsSubmitted,
      setLoading,
      guest
    ]
  );

  const handleErrorReponse = async (errorMessage) => {
    if (errorMessage.includes("All Fields are required")) {
      setErrorMessage(errorMessage);
    } else if (errorMessage.includes("Invalid Credentials")) {
      setErrorMessage("Invalid Credentials");
    } else {
      throw new Error("Something Went Wrong");
    }
  };

  const handleGuest = () => {
    setGuest(true);
  };
  const handleCloseModal = () => {
    setGuest(false);
    setGuestFormData({ name: "", recruiter: false });
    document.body.style.overflow = "auto";
  };

  return (
    <>
    {isSignedIn && < Home />}
    <div className="bg-cover flex flex-row justify-center items-center gap-1.5 sm:mt-4 mt-[5rem]">
      {message && (
        <MessagesCentre type="success" messageText={message} top={16} mt={0} />
      )}
      <div className="lg:inline hidden h-[50rem] w-[50rem]">
        <Carousel className=" top-0 left-2 " indicators={true}>
          <img
            className="border rounded-3xl"
            src={img1}
            alt="AI GENERATED IMAGES"
          />
          <img
            className="border rounded-3xl"
            src={img2}
            alt="AI GENERATED IMAGES"
          />
          <img
            className="border rounded-3xl"
            src={img3}
            alt="AI GENERATED IMAGES"
          />
          <img
            className="border rounded-3xl"
            src={img4}
            alt="AI GENERATED IMAGES"
          />
          <img
            className="border rounded-3xl"
            src={img5}
            alt="AI GENERATED IMAGES"
          />
        </Carousel>
      </div>
      <div>
        <form
          className=" top-0 z-10 flex flex-col justify-center items-center space-y-3.5 bg-gray-300 p-5 mr-5 ml-5 border rounded-3xl mb-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-row">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="p-4 bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-100  flex justify-center items-center mr-2 border rounded-full"
            />
            <Input
              id="email"
              value={formData.email}
              onChange={handleChange}
              required={true}
              placeholder="Email or Username"
              isSubmitted={formData.email === "" ? isSubmitted : false}
            />
          </div>

          <div className="flex flex-row">
            <FontAwesomeIcon
              icon={faLock}
              className="p-4 bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-100  flex justify-center items-center mr-2 border rounded-full"
            />
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required={true}
              placeholder="Password"
              isSubmitted={formData.password === "" ? isSubmitted : false}
            />
          </div>
          <div className="flex w-full gap-2">
            <Button
              className="w-full  hover:bg-purple-200  text-white"
              gradientDuoTone="purpleToBlue"
              outline
              onClick={() => handleSubmit(false)}
             type="submit"
            >
              Log on
            </Button>
          </div>
          <div className="text-center text-gray-500 text-sm">
            {"Don't have an account? No worries! Log in as a "}
            <a
              href="#"
              onClick={handleGuest}
              className="text-blue-800 hover:text-green-600 hover:font-bold transform transition duration-500 hover:scale-110"
            >
              guest
            </a>
          </div>
          <div className="w-full flex flex-row space-x-3 justify-center items-center">
            <hr className="w-full border border-white-300 "></hr>
            <span className="text-gray-500 font-semibold">OR</span>
            <hr className="w-full border border-white-300"></hr>
          </div>

          <div className="flex flex-row justify-center items-center space-x-4">
            <span className="text-gray-500 text-md font-semibold">
              Log in with
            </span>
            <button type="button" className=" hover:text-gray-900 dark:hover:text-blue-700">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 0h-14c-2.8 0-5 2.2-5 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5v-14c0-2.8-2.2-5-5-5zm-14 4h3v2h-3v-2zm0 4h3v12h-3v-12zm5 0h3v1.6h.1c.4-.8 1.5-1.6 3.1-1.6 3.3 0 3.9 2.2 3.9 5v7h-3v-6c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1v6.1h-3v-12z" />
              </svg>
            </button>
            <button type="button">
              <svg
                className="w-6 h-6 text-white bg-black border-black rounded-lg hover:bg-white hover:text-black"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0c-6.6 0-12 5.4-12 12 0 5.3 3.4 9.8 8.2 11.5.6.1.8-.3.8-.6v-2.3c-3.3.7-4-1.6-4-1.6-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.3-3.2-.1-.3-.6-1.5.1-3.2 0 0 1.1-.3 3.5 1.3 1-.3 2.1-.4 3.2-.4s2.2.1 3.2.4c2.4-1.6 3.5-1.3 3.5-1.3.7 1.7.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.4 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.8-1.7 8.2-6.2 8.2-11.5 0-6.6-5.4-12-12-12z" />
              </svg>
            </button>
            <ViaGoogleLogin />
          </div>

          {loading && <Loader />}
        </form>
        <div className="border-2 border-teal-500 font-sans rounded-md m-8 p-2 bg-gray-300 text-center">
          <span>
            {" "}
            {`Don't have an account?`}{" "}
            <Link
              to="/sign-up"
              className="ml-2 text-blue-700 font-semibold hover:font-bold hover:text-teal-700"
            >
              Sign up
            </Link>
          </span>
        </div>
        {errorMessage && (
          <MessagesCentre
            messageText={errorMessage}
            type="error"
            click={key}
            top={16}
            mt={0}
          />
        )}
        {showSignUpSuccess && (
          <MessagesCentre
            messageText={"Sign-up successful!"}
            type="success"
            click={key}
            top={16}
            mt={0}
          />
        )}
        {guest && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-2xl transform transition-all duration-300 hover:scale-105">
              <Input
                id="name"
                placeholder="Name"
                value={guestFormData.name}
                onChange={guestInfoChange}
              />

              <div className="flex flex-row justify-start items-center space-x-3 mt-2">
                <label
                  htmlFor="isRecruiter"
                  className="font-medium text-gray-700"
                >
                  Are you a recruiter?{" "}
                </label>
                <input
                  name="recruiter"
                  type="checkbox"
                  checked={guestFormData.recruiter}
                  id="recruiter"
                  onChange={guestInfoChange}
                  value={guestFormData.recruiter}
                  className="mt-1"
                ></input>
              </div>
              {/* Action buttons */}
              <div className="flex justify-end mt-2">
                <button
                  className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md mr-2 hover:bg-gray-300"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
                  onClick={ handleSubmit}
                >
                  Skip
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default SignIn;

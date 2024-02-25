import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef, useCallback } from "react";
import { clearSignUpSuccess, signInSuccess } from "./../redux/store";
import { useNavigate } from "react-router-dom";
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
import {
  faEnvelope,
  faLock,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signUpSuccess = useSelector((state) => state.signUpSuccess);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source");
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

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

  const handleSubmit = useCallback(async () => {
    setKey((prev) => prev + 1);
    setIsSubmitted(true);
    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      let resMessage = "";
      if (res.headers.get("content-type").includes("application/json")) {
        resMessage = await res.json();
      }
      if (!res.ok && resMessage !== "") {
        await handleErrorReponse(resMessage.message);
      } else if (res.ok && resMessage !== "") {
        dispatch(signInSuccess());
        console.log(dispatch(signInSuccess()));
        navigate("/sign-up?source=signin");
      } else {
        throw new Error("Something went wrong, please try again!");
      }
    } catch (error) {
      setIsSubmitted(false);
      setErrorMessage(error.message);
    }
    setLoading(false);
  }, [formData]);

  const handleErrorReponse = async (errorMessage) => {
    if (errorMessage.includes("All Fields are required")) {
      setErrorMessage(errorMessage);
    } else if (errorMessage.includes("Invalid Credentials")) {
      setErrorMessage("Invalid Credentials");
    } else {
      throw new Error("Something Went Wrong");
    }
  };


  return (
    <div className="bg-cover flex flex-row justify-center items-center w-full p-10">
      <div className="lg:inline hidden w-1/3 mr-10 relative">
        <div className=" p-96  rounded-3xl">
          <Carousel className="absolute top-0 left-0 " indicators={false}>
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
      </div>
      <div>
        <form
          className="sticky top-0 z-10 flex flex-col justify-center items-center space-y-8 bg-gray-300 p-5 mr-5 border rounded-3xl"
          onSubmit={handleChange}
        >

          <div className="flex flex-row">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="p-4 bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-100  flex justify-center items-center mr-2 border rounded-full"
            />
            <Input
              id="email"
              type="email"
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

          <Button
            className="sm:w-full w-auto  hover:bg-purple-200  text-white"
            gradientDuoTone="purpleToBlue"
            outline
            onClick={handleSubmit}
          >
            Log on
          </Button>
          {loading && <Loader />}
        </form>
        {errorMessage && (
           <MessagesCentre messageText={errorMessage} type="error" click={key} />
        )}
        {signUpSuccess && (
          <MessagesCentre messageText={"Sign-up successful!"} type="success" />
        )}
        {signUpSuccess && (
          <MessagesCentre messageText={"Welcome!!"} type="success" />
        )}
      </div>
    </div>
  );
};

export default SignIn;

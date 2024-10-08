import { useState, useCallback, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  faUser,
  faUserClock,
  faEnvelope,
  faLock,
  faIdCard,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";
import MessagesCentre from "../components/MessagesCentre";
import { signUpSuccess } from "../redux/user/userSlice";
import Home from "./Home";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isRecruiter: false,
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [signupSuccess, setsignupSuccess] = useState(null);
  const [key, setKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSignedIn = useSelector((state) => state.user.signInSuccess);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = useCallback(async () => {
    setKey((prev) => prev + 1);
    setIsSubmitted(true);
    setLoading(true);
    setsignupSuccess(null);
    setErrorMessage(null);
    const emailPattern = /^\S+@\S+\.\S+$/;
    if (
      formData.password !== formData.confirmPassword &&
      formData.password !== ""
    ) {
      await handleErrorReponse("password match error");
    } else if (formData.password.length < 6 && formData.password !== "") {
      await handleErrorReponse("password length error");
    } else if (!emailPattern.test(formData.email) && formData.email !== "") {
      await handleErrorReponse("email validation error");
    } else {
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
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
          dispatch(signUpSuccess());
          navigate("/sign-in?source=signup");
          setFormData({
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "", // Reset confirm password field
          });
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        setIsSubmitted(false);
        setErrorMessage(error.message);
      }
    }

    setLoading(false);
  }, [formData]);

  const handleErrorReponse = async (errorMessage) => {
    if (errorMessage.includes("E11000 duplicate key error collection")) {
      setErrorMessage("User with this username or email already exists");
    } else if (errorMessage.includes("All Fields are required")) {
      setErrorMessage(errorMessage);
    } else if (errorMessage.includes("password match error")) {
      setErrorMessage("Password & Confirm Password do not match");
    } else if (errorMessage.includes("password length error")) {
      setErrorMessage("Password length should be at least 6 characters");
    } else if (errorMessage.includes("email validation error")) {
      setErrorMessage("Please enter a valid email address");
    } else {
      throw new Error("Something Went Wrong");
    }
  };

  const memoizedMessagesCentre = useMemo(
    () => (
      <div>
        {signupSuccess && (
          <MessagesCentre
            messageText={signupSuccess}
            type="success"
            click={key}
            top={16}
            mt={0}
          />
        )}
        {errorMessage && (
          <MessagesCentre
            messageText={errorMessage}
            type="error"
            click={key}
            top={16}
            mt={0}
          />
        )}
      </div>
    ),
    [signupSuccess, errorMessage, key]
  );

  return (
    <>
      {isSignedIn && <Home />}
      <div className="bg-cover flex flex-row justify-center items-center gap-1.5 sm:mt-4 mt-[5rem]">
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
            className="top-0 z-10 flex flex-col justify-center items-center space-y-3.5 bg-gray-300 p-5 mr-5 ml-5 border rounded-3xl"
            onSubmit={handleSubmit}
          >
            <div className="flex sm:flex-row">
              <FontAwesomeIcon
                icon={faUser}
                className="p-4 bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-100  mr-2 border rounded-full"
              />
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required={true}
                placeholder={`First Name`}
                isSubmitted={formData.firstName === "" ? isSubmitted : false}
              />
            </div>

            <div className="flex flex-row">
              <FontAwesomeIcon
                icon={faUserClock}
                className="p-4 bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-100   mr-2 border rounded-full"
              />
              <Input
                required={true}
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder={"Last Name"}
                isSubmitted={formData.lastName === "" ? isSubmitted : false}
              />
            </div>

            <div className="flex sm:flex-row">
              <FontAwesomeIcon
                icon={faIdCard}
                className="p-4 bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-100  mr-2 border rounded-full"
              />
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required={true}
                placeholder="Username"
                isSubmitted={formData.username === "" ? isSubmitted : false}
              />
            </div>

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
                placeholder="Email"
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

            <div className="flex flex-row">
              <FontAwesomeIcon
                icon={faCheckDouble}
                className="p-4 bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-100  flex justify-center items-center mr-2 border rounded-full"
              />
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required={true}
                placeholder="Confirm Password"
                isSubmitted={
                  formData.confirmPassword === "" ? isSubmitted : false
                }
              />
            </div>
            <div className="flex flex-row justify-center items-center space-x-3">
              <label
                htmlFor="isRecruiter"
                className="font-medium text-gray-700"
              >
                Are you a recruiter?{" "}
              </label>
              <input
                name="isRecruiter"
                type="checkbox"
                checked={formData.isRecruiter}
                id="isRecruiter"
                onChange={handleChange}
                value={formData.isRecruiter}
                className="mt-1"
              ></input>
            </div>

            <Button
              className="sm:w-full w-auto  hover:bg-purple-200  text-white"
              gradientDuoTone="purpleToBlue"
              outline
              onClick={handleSubmit}
            >
              Sign up
            </Button>
            {loading && <Loader />}
          </form>
          <div className="border-2 border-teal-500 font-sans rounded-md ml-8 mr-8 mt-4 p-2 bg-gray-300 text-center">
            <span>
              Already have an account?{" "}
              <Link
                to="/sign-in"
                className="ml-2 text-blue-700 font-semibold hover:font-bold hover:text-teal-700"
              >
                Log-on
              </Link>
            </span>
          </div>
          {memoizedMessagesCentre}
        </div>
      </div>
    </>
  );
};

export default SignUp;

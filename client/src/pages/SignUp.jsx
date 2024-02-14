import { useState, useCallback, useMemo } from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import MessagesCentre from "../components/MessagesCentre";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "", // New field for username
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [signupSuccess, setsignupSuccess] = useState(null);
  const [key, setKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
    setLoading(true); // Set the loader to true here
    setsignupSuccess(null);
    setErrorMessage(null);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      let resMessage = "";
      if (res.headers.get("content-type").includes("application/json")) {
        resMessage = await res.json();
      }
      console.log(res, resMessage);
      if (res.ok && resMessage !== "") {
        setsignupSuccess(resMessage.message);
        setFormData({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
        });
        setIsSubmitted(false);
      } else if (!res.ok && resMessage !== "") {
        await handleErrorReponse(resMessage.message);
      } else {
        throw new Error("Something went wrong, please try again!");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setLoading(false); // Set the loader to false here
  }, [formData]);

  const handleErrorReponse = async (errorMessage) => {
    if (errorMessage.includes("E11000 duplicate key error collection")) {
      setErrorMessage("User with this username or email already exists");
    } else if (errorMessage.includes("All Fields are required")) {
      setErrorMessage(errorMessage);
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
          />
        )}
        {errorMessage && (
          <MessagesCentre messageText={errorMessage} type="error" click={key} />
        )}
      </div>
    ),
    [signupSuccess, errorMessage, key]
  );

  return (
    <div className=" mt-20 bg-cover flex flex-row items-center justify-center w-full h-full">
      <div className="lg:inline hidden w-1/3 mr-10 relative">
        <div className=" p-96  rounded-3xl">
          <Carousel className="absolute top-0 left-0 ">
            <img className="border rounded-3xl" src={img1} alt="..." />
            <img className="border rounded-3xl" src={img2} alt="..." />
            <img className="border rounded-3xl" src={img3} alt="..." />
            <img className="border rounded-3xl" src={img4} alt="..." />
            <img className="border rounded-3xl" src={img5} alt="..." />
          </Carousel>
        </div>
      </div>
      <div>
        <form
          className="sticky top-0 z-10 flex flex-col justify-center items-center space-y-8 bg-gray-300 p-5 mr-5 border rounded-3xl"
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
            {" "}
            {/* New field for username */}
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

          <div className="flex flex-row $">
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

          <div className="flex flex-row ">
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
            Sign up
          </Button>
          {loading && <Loader />}
        </form>
        {memoizedMessagesCentre}
      </div>
    </div>
  );
};

export default SignUp;

import { useState } from "react";
import Input from "../components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import img1 from "../images/sign-up/img1.jpg";
import img2 from "../images/sign-up/img2.jpg";
import img3 from "../images/sign-up/img3.jpg";
import img4 from "../images/sign-up/img4.jpg";
import img5 from "../images/sign-up/img5.jpg";
import { Carousel } from "flowbite-react";
import { Button } from "flowbite-react";
import {
  faUser,
  faUserClock,
  faEnvelope,
  faLock,
  faIdCard,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "", // New field for username
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorClass = `p-4 bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-100 flex justify-center items-center mr-2 border rounded-full ${
    isSubmitting && !formData.password && "border-red-500"
  }`;
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("submit");
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        // If response status is not OK (200), throw an error
        throw new Error("Failed to sign up");
      }

      const data = await res.json();
    } catch (error) {
      // Handle error here
      setErrorMessage("All fields are required");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000); // Hide error message after 5 seconds
    }
  };

  return (
    <div className="mt-20 bg-cover flex flex-row items-center justify-center w-full h-full">
      <div className="lg:inline hidden overflow-hidden mr-10">
        <div className="relative w-full p-96 border rounded-3xl ">
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
              isSubmitted={formData.firstName === "" ? isSubmitting : false}
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
              isSubmitted={formData.lastName === "" ? isSubmitting : false}
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
              isSubmitted={formData.username === "" ? isSubmitting : false}
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
              isSubmitted={formData.email === "" ? isSubmitting : false}
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
              isSubmitted={formData.password === "" ? isSubmitting : false}
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
        </form>
        {errorMessage && (
          <div className="fixed top-16 w-1/6 mt-2 right-1 z-50 max-w-xs">
            <div className=" flex-row sm:flex items-center justify-between bg-red-300 w-full rounded-md border border-gray-300 px-3 py-2">
              <span className="text-start mr-2">{errorMessage}</span>
              <button
                onClick={() => setErrorMessage(null)}
                className="text-red-500"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;

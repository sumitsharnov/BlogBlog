// eslint-disable-next-line no-unused-vars
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
} from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <div className="relative mt-6 border border-purple-950 border-solid p-20 bg-cover flex md:items-end md:justify-end items-center justify-center w-full h-full overflow-hidden">
      <Carousel className="absolute top-0 left-0 h-full lg:inline-block hidden">
      
  <img  className="border rounded-3xl h-96 w-96"  src={img1} alt="..."/>
     <img className="border rounded-3xl "  src={img2} alt="..."/>
     <img className="border rounded-3xl "  src={img3} alt="..."/>
     <img className="border rounded-3xl "  src={img4} alt="..."/>
     <img className="border rounded-3xl "  src={img5} alt="..."/>


        
        {/* <img className="w-full" src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
      <img className="w-full h-auto" src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
      <img className="w-full h-auto" src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
      <img className="w-full h-auto" src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." /> */}
      </Carousel>
      <form
        className="z-10 flex flex-col sm:justify-center sm:items-center space-y-8 bg-gray-300 p-5 relative w-auto h-auto border rounded-3xl"
        onSubmit={handleSubmit}
      >
        <div className="flex sm:flex-row">
          <FontAwesomeIcon
            icon={faUser}
            className="p-4 bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-100  mr-2 border rounded-full"
          />
          <Input
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            required={true}
            placeholder="First Name"
          />
        </div>

        <div className="flex flex-row">
          <FontAwesomeIcon
            icon={faUserClock}
            className="p-4 bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-100   mr-2 border rounded-full"
          />
          <Input
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            required={true}
            placeholder="Last Name"
          />
        </div>

        <div className="flex flex-row">
          <FontAwesomeIcon
            icon={faEnvelope}
            className="p-4 bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-100  flex justify-center items-center mr-2 border rounded-full"
          />
          <Input
            type="email"
            value={formData.email}
            onChange={handleChange}
            required={true}
            placeholder="Email"
          />
        </div>

        <div className="flex flex-row">
          <FontAwesomeIcon
            icon={faLock}
            className="p-4 bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-100  flex justify-center items-center mr-2 border rounded-full"
          />
          <Input
            type="password"
            value={formData.password}
            onChange={handleChange}
            required={true}
            placeholder="Password"
          />
        </div>

        <Button
          className="sm:w-full w-auto  hover:bg-purple-200  text-white"
          gradientDuoTone="purpleToBlue"
          outline
        >
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default SignUp;

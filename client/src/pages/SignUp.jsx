import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

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
    <div className="flex justify-center items-center min-h-screen">
      {/* Left side div */}
      <div className="mr-8">Left side content</div>

      {/* Form */}
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center flex-col items-center max-h-screen">
          <label htmlFor="firstName" className="w-full">First Name:</label>
          <div className="flex flex-row border border-black border-solid">
            <FontAwesomeIcon
              icon={faUser}
              className="p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  flex justify-center items-center m-l-2"
            />
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex justify-center flex-col items-center ">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex justify-center flex-col items-center ">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex justify-center flex-col items-center ">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;

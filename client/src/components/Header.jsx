import { Navbar } from "flowbite-react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearSignInSuccess, updateCurrentUser } from "../redux/user/userSlice";
import { setDefaultColor } from "../redux/home/homeSlice";
import Cookies from "js-cookie";
import anonuser from "../images/home/anonuser.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserEdit,
  faSignOut,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import MessagesCentre from "./MessagesCentre";
import { useState } from "react";
import Tooltip from "./Tooltip";
import {
  setCommunicationUserId,
  setMessageThread,
  setShowMessagesToAdmin,
} from "../redux/communications/commSlice";

export default function Header() {
  const [errorImage, setErrorImage] = useState(false);
  const [count, setCount] = useState(0);
  const location = useLocation();
  const { currentUser, signInSuccess } = useSelector((state) => state.user);
  const { unreadMessagesCount } = useSelector((state) => state.comm);
  const displayImage = (currentUser && currentUser.photoURL) || anonuser;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleProfile = () => {
    navigate("/profile");
  };

  const handleErrorImage = (event) => {
    setErrorImage("Failed to load profile picture, please try again later");
    setCount(count + 1);
    console.log(event);
    dispatch(updateCurrentUser({ ...currentUser, photoURL: anonuser }));
  };

  return (
    <>
      {errorImage && (
        <MessagesCentre
          messageText={errorImage}
          type="error"
          top={16}
          mt={0}
          key={count}
        />
      )}
      <Navbar className="top-0 left-0 w-full border-b-2 z-50">
        <NavLink
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl">
            {`Sumit's`}
          </span>
          <span className="p-1">Portfolio</span>
        </NavLink>
        {/* <form>
          <TextInput
            type="text"
            placeholder="Search..."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
          />
        </form> */}
        <div className="flex gap-2 md:order-2">
          {/* <Button className="w-12 h-10 lg:hidden" color="gray" pill>
            <AiOutlineSearch />
          </Button> */}
          {/* <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
            <FaMoon />
          </Button> */}
          {currentUser && signInSuccess && (
            <div  onClick={handleProfile} className="flex items-center">
              <span
                className={`mr-2 ${(() => {
                  const colors = [
                    "text-yellow-500",
                    "text-red-500",
                    "text-violet-500",
                    "text-green-500",
                    "text-white",
                  ];
                  return colors[Math.floor(Math.random() * colors.length)];
                })()} transition-all duration-300 ease-in-out transform hover:scale-110 hover:underline cursor-pointer text-pretty`}
              >
                {(() => {
                  const firstName = currentUser.firstName;
                  return (
                    firstName.charAt(0).toUpperCase() +
                    firstName.slice(1).toLowerCase()
                  );
                })()}
              </span>
              <div className="relative group size-10 mt-1">
                <div className="justify-center items-center">
                  <img
                    src={displayImage}
                    alt="profile"
                    className="w-8 h-8 rounded-full transition duration-300 transform hover:scale-110 mr-[3em]"
                    onError={handleErrorImage}
                  />
                </div>
                <div className="absolute hidden group-hover:inline bg-white bg-opacity-75 backdrop-blur-sm shadow-md py-2 rounded-md mt-2 right-0 w-32">
                  <ul className="list-none p-0 m-0">
                    <li
                      className="cursor-pointer px-4 py-2 hover:bg-gray-200 transition-colors duration-300 rounded-md"
                      onClick={handleProfile}
                    >
                      <FontAwesomeIcon icon={faUserEdit} className="pr-2" />
                      Profile
                    </li>
                    <NavLink
                      to="/sign-in"
                      onClick={() => {
                        Cookies.set("loginSuccess", "false");
                        Cookies.set("timeout", "You have been logged out");
                        dispatch(setCommunicationUserId(""));
                        dispatch(setMessageThread(""));
                        dispatch(clearSignInSuccess());
                        dispatch(setDefaultColor());
                        dispatch(setShowMessagesToAdmin(false));
                      }}
                    >
                      <li className="cursor-pointer px-4 py-2 hover:bg-gray-200 transition-colors duration-300 rounded-md">
                        <FontAwesomeIcon icon={faSignOut} className="pr-2" />
                        Log Out
                      </li>
                    </NavLink>
                  </ul>
                </div>
              </div>
            </div>
          )}

          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link as="div">
            {signInSuccess && (
              <NavLink
                to="/"
                className={
                  location.pathname === "/"
                    ? "border-b-4 border-purple-400 p-2"
                    : ""
                }
              >
                Home
              </NavLink>
            )}
          </Navbar.Link>
          <Navbar.Link as="div">
            {signInSuccess &&
              (currentUser.type.toLowerCase() === "guest" ? (
                <Tooltip message="Communication can only be initiated when you are logged in">
                  <span className="text-gray-500 p-2 cursor-not-allowed">
                    Communications
                  </span>
                </Tooltip>
              ) : (
                <NavLink
                  to="/communications"
                  className={
                    location.pathname === "/communications"
                      ? "border-b-4 border-purple-400 p-2 relative"
                      : "relative"
                  }
                >
                  <div className="relative inline-block">
                    <FontAwesomeIcon icon={faCommentDots} className="mr-2" />
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-4 h-4 text-xs font-bold leading-none text-white bg-red-600 rounded-full mr-2">
                      {unreadMessagesCount}
                    </span>
                  </div>
                  Communications
                </NavLink>
              ))}
          </Navbar.Link>
          {/* <Navbar.Link as="div">
            <NavLink
              to="/about"
              className={
                location.pathname === "/about"
                  ? "border-b-4 border-purple-400 p-2"
                  : ""
              }
            >
              About
            </NavLink>
          </Navbar.Link> */}
          {/* <Navbar.Link as="div">
            <NavLink
              to="/projects"
              className={
                location.pathname === "/projects"
                  ? "border-b-4 border-purple-400 p-2"
                  : ""
              }
            >
              Projects
            </NavLink>
          </Navbar.Link> */}
        </Navbar.Collapse>
      </Navbar>
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-1 w-full"></div>
    </>
  );
}

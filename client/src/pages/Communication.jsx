import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {
  faPaperPlane,
  faMessage,
  faEdit,
  faSave,
  faTrash,
  faMultiply,
  faCheckDouble,
  faSync,
} from "@fortawesome/free-solid-svg-icons";
import Home from "./Home";
import ReplyThread from "../components/ReplyThread";
import MessagesCentre from "../components/MessagesCentre";
import TimestampComponent from "../components/TimestampComponent";
import Loader from "../components/Loader";
import { useCommunication } from "../hooks/useCommunication";
import { useSelector } from "react-redux";
import anonuser from "../images/home/anonuser.png";
import { setMessageId } from "../redux/communications/commSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import AdminComm from "../components/AdminComm";
import Tooltip from "../components/Tooltip";

const Communication = () => {
  const {
    handleReplies,
    showReplies,
    setShowReplies,
    replyThread,
    handleSubmit,
    count,
    message,
    setMessage,
    user,
    handleEdit,
    edit,
    handleEditSave,
    handleCancelEdit,
    setEditMessage,
    editMessage,
    messageThread,
    backToCommUsers,
    markMessageAsRead,
    getAllMessages,
    sync,
    // getCountUnreadMessages
  } = useCommunication();
  // const {showMessagesToAdmin} =  useAdminComm();
  const { currentUser } = useSelector((state) => state.user);
  const { newMessage } = useSelector((state) => state.comm);
  const {
    activatedMessage,
    showMessagesToAdmin,
    loading,
    errorText: errorMessage,
  } = useSelector((state) => state.comm);
  const messageEntries =
    messageThread && Object.entries(messageThread).reverse();
  const [displayImage, setDisplayImage] = useState(
    (currentUser && currentUser.photoURL) || anonuser
  );
  const dispatch = useDispatch();
  const [activeThread, setActiveThread] = useState(null);

  useEffect(() => {
    setActiveThread(activatedMessage);
  }, [activatedMessage]);

  const handleErrorImage = (event) => {
    console.error(event);
    setDisplayImage(anonuser);
  };

  return currentUser.type.toLowerCase() === "guest" ? (
    <Home />
  ) : currentUser.type.toLowerCase() === "user" ||
    currentUser.type.toLowerCase() === "thirdparty" ||
    showMessagesToAdmin ? (
    <>
      <div className="min-w-96 overflow-x-hidden">
        {errorMessage && (
          <MessagesCentre
            type={"error"}
            messageText={errorMessage}
            key={count}
          />
        )}

        <div className="flex justify-around">
          <h2 className="p-4 font-bold text-[2rem] text-gray-600 lg:inline-block hidden">
            Messages
          </h2>
          <div className="flex justify-centre items-center gap-2">
            <img
              src={displayImage}
              alt="profile"
              className="w-8 h-8 rounded-full transition duration-300 transform hover:scale-110"
              onError={handleErrorImage}
            />
            <textarea
              type="text"
              value={message}
              placeholder="Write to Sumit..."
              className={`w-[100%]  p-2 rounded-lg max-h-24 min-h-16 ${
                !message ? "border border-red-400" : "border border-green-500"
              }`}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              className="flex gap-2 justify-center items-center  ml-2 border border-violet-200 rounded-full p-2 bg-gradient-to-tr from-green-200 via-violet-200 to-blue-200 text-gray-600 font-semibold hover:text-white hover:bg-gradient-to-tr 
          hover:from-gray-500 hover:via-green-600 hover:to-blue-400 shadow-2xl transition-all"
              onClick={handleSubmit}
            >
              <FontAwesomeIcon icon={faPaperPlane} className="flex" />
              Post
            </button>
            <button
              className="border-2 border-red-200 p-2 rounded-full flex gap-1 justify-between items-center hover:bg-violet-200"
              onClick={() => {getAllMessages(false, true)}}
            >
              <FontAwesomeIcon icon={faSync} />
              {sync ? "Syncing..." : "Sync"}
            </button>
            {showMessagesToAdmin && (
              <button
                className="flex gap-2 justify-center items-center border border-red-500 rounded-full p-2 bg-white text-gray-600 font-semibold hover:text-white hover:bg-gradient-to-tr 
          hover:from-red-300 hover:via-red-400 hover:to-red-300 shadow-2xl transition-all"
                onClick={backToCommUsers}
              >
                <FontAwesomeIcon icon={faMultiply} className="flex" />
                Exit
              </button>
            )}
          </div>
        </div>
        <hr className="w-full border border-gray-300"></hr>
        <div className="flex justify-between">
          <div className="w-full">
            {newMessage && <div className="text-center font-medium text-red-300  p-2 m-2 rounded-full  transition-all animate-bounce">{newMessage}</div>}
            {(loading || sync) && (
              <span className="flex flex-col justify-center items-center p-4">
                <p className="m-2 text-violet-500 p-2">
                  {edit && editMessage.trim() !== ""
                    ? "Editing"
                    : edit && editMessage.trim() === ""
                    ? "Deleting"
                    : messageEntries && messageEntries.length > 0
                    ? sync
                      ? "Syncing..."
                      : "Posting..."
                    : "Loading..."}
                </p>
                <Loader />
              </span>
            )}
            {messageEntries && messageEntries.length > 0
              ? messageEntries.map(([key, msg]) => (
                  <div
                    key={key}
                    className={`flex items-start p-4 rounded-lg shadow-lg mb-4  relative ${
                      activeThread === msg.id &&
                      "bg-violet-200 m-4 translate-all duration-200"
                    } ${
                      msg.delete ? "pointer-events-none cursor-default" : ""
                    }`}
                    onClick={async () => {
                      dispatch(setMessageId(msg.id));
                      handleReplies(msg.id);
                      currentUser._id !== msg.user && markMessageAsRead(msg.id);
                      // getCountUnreadMessages();
                    }} // Pass the index as the message ID
                  >
                    <div className="flex-shrink-0 p-2">
                      <img
                        src={msg.photoURL ? msg.photoURL : anonuser}
                        alt="profile"
                        className="w-12 h-12 rounded-lg transition duration-300 transform hover:scale-110 border border-violet-400 mr-4"
                        onError={handleErrorImage}
                      />
                    </div>
                    <div className="flex flex-col flex-grow min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-lg truncate">
                          {msg.firstName && msg.firstName}
                        </span>
                        <span
                          className="text-sm text-gray-500 opacity-70 flex gap-2"
                          key={msg.id}
                        >
                          <TimestampComponent
                            timestamp={msg.sentAt && msg.sentAt}
                          />
                        </span>
                      </div>
                      <div
                        className={`mt-2 p-2 bg-gray-100 rounded-lg border border-gray-200 shadow-sm ${
                          showReplies && "w-[40%]"
                        }`}
                      >
                        {edit && activeThread === msg.id ? (
                          <div className="flex flex-row-reverse justify-between items-center">
                            <textarea
                              defaultValue={msg.message}
                              onChange={(e) => setEditMessage(e.target.value)}
                              className="w-[100%] p-1 relative mr-[1.5rem] max-h-48 focus:outline-none shadow-stone-800"
                            />
                            <button
                              className="rounded-full bg-red-500  text-white hover:bg-red-600 focus:outline-none absolute "
                              onClick={handleCancelEdit}
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path d="M6 18L18 6M6 6l12 12"></path>
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <div
                            className="relative group hover:cursor-pointer"
                            key={count}
                          >
                            <div
                              onClick={async () => {
                                dispatch(setMessageId(msg.id));
                                currentUser._id !== msg.user && markMessageAsRead(msg.id);
                              }}
                              className={`break-words rounded-md shadow-md transition-all duration-300 ease-in-out flex justify-start
                                  ${
                                    !msg.read &&
                                    currentUser._id !== msg.user &&
                                    !msg.delete
                                      ? "bg-purple-100 border-l-4 border-purple-500 text-purple-700 hover:text-purple-900 hover:font-medium font-bold"
                                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                  } ${msg.delete && "bg-orange-100"}`}
                              key={count}
                            >
                              <p className={`whitespace-pre-line p-1`}>
                                {msg.message && msg.message}
                              </p>
                              <span className="ml-1 text-gray-400 font-light p-1">
                                {" "}
                                {msg.edit && "(edited)"}{" "}
                              </span>
                            </div>
                            {msg.read ? (
                              <span className="absolute top-0 right-0 h-2 w-2 bg-purple-500 rounded-full"></span>
                            ) : (
                              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                            )}
                            {msg.read ||
                              (currentUser._id !== msg.user && (
                                <div className="w-72">
                                  <Tooltip message="Message will be marked Read when clicked; sender will be notified"></Tooltip>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                      <div className={`${msg.delete && "hidden"}`}>
                        <div className="flex gap-2  ml-[2%] mt-2 m-4">
                          <div
                            className="cursor-pointer text-gray-600 hover:text-green-800 font-medium rounded transition duration-300 ease-in-out"
                            onClick={async () => {
                              dispatch(setMessageId(msg.id));
                              handleReplies(msg.id);
                            }} // Pass the index as the message ID
                          >
                            <FontAwesomeIcon
                              icon={faMessage}
                              className="flex"
                            />
                          </div>

                          <div
                            className={`cursor-pointer ${
                              edit && activeThread === msg.id
                                ? "text-green-800"
                                : "text-red-500"
                            } hover:text-blue-800 font-medium  rounded transition duration-300 ease-in-out -mt-[.1rem] `}
                            onClick={async () => {
                              dispatch(setMessageId(msg.id));
                              edit && activeThread === msg.id
                                ? handleEditSave(msg.id, msg.message)
                                : handleEdit(msg.id, msg.message);

                              handleReplies(msg.id, false, false); // Set loading state to false after 3 seconds (simulating data loading)
                            }} // Pass the index as the message ID
                          >
                            {edit && activeThread === msg.id
                              ? msg.message.trim() !== editMessage.trim() &&
                                (editMessage.trim() === "" ? (
                                  <span className="text-gray-500 hover:text-red-500 hover:transition-all">
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                      className="flex"
                                    />
                                  </span>
                                ) : (
                                  <FontAwesomeIcon
                                    icon={faSave}
                                    className="flex"
                                  />
                                ))
                              : currentUser._id === msg.user && (
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    className="flex"
                                  />
                                )}
                          </div>
                          {currentUser._id === msg.user &&
                            (msg.read ? (
                              <Tooltip message="Read">
                                <span className="text-gray-500 cursor-pointer">
                                  <FontAwesomeIcon
                                    icon={faCheckDouble}
                                    className="flex text-blue-500"
                                  />
                                </span>
                              </Tooltip>
                            ) : (
                              <Tooltip message="Sent">
                                <span className="text-gray-500 cursor-pointer">
                                  <FontAwesomeIcon
                                    icon={faCheckDouble}
                                    className="flex text-gray-500"
                                  />
                                </span>
                              </Tooltip>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : loading || (
                  <div className="flex justify-center border border-green-300 rounded-lg m-12 p-[10rem]">
                    Communication has not been started yet
                  </div>
                )}
          </div>
          <div
            className={`fixed inset-y-0 right-0 transform transition-transform duration-500 mt-[10rem] ease-out ${
              showReplies ? "translate-x-0" : "translate-x-full"
            } w-[50%] bg-white shadow-2xl overflow-y-auto`}
            style={{ maxHeight: "calc(100vh - 17rem)" }}
          >
            <ReplyThread
              setShowReplies={setShowReplies}
              user={user}
              replyThread={replyThread}
              count={count}
            />
          </div>
        </div>
      </div>
    </>
  ) : (
    <AdminComm />
  );
};

export default Communication;

Communication.propTypes = {
  showMessagesToAdmin: PropTypes.bool,
};

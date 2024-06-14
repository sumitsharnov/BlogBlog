import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faMessage,
  faEdit,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
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
const Communication = () => {
  const {
    handleReplies,
    showReplies,
    setShowReplies,
    replyThread,
    handleSubmit,
    errorMessage,
    count,
    message,
    setMessage,
    loading,
    messageEntries,
    user,
    handleErrorImage,
    handleEdit,
    edit,
    handleEditSave,
    handleCancelEdit,
    setEditMessage,
  } = useCommunication();
  const { currentUser } = useSelector((state) => state.user);
  const { activatedMessage } = useSelector((state) => state.comm);
  const displayImage = (currentUser && currentUser.photoURL) || anonuser;
  const dispatch = useDispatch();
  const [activeThread, setActiveThread] = useState(null);

  useEffect(() => {
    setActiveThread(activatedMessage);
  }, [activatedMessage]);

  return (
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
              className="w-16 h-10 rounded-full transition duration-300 transform hover:scale-110 m-4 border border-violet-400"
              onError={handleErrorImage}
            />
            <textarea
              type="text"
              value={message}
              placeholder="Write your message here..."
              className={`w-[100%]  p-2 rounded-lg max-h-24 min-h-16 ${
                !message ? "border border-red-400" : "border border-green-500"
              }`}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              className="flex gap-2 justify-center items-center mr-12 ml-2 border border-violet-200 rounded-full p-2 bg-gradient-to-tr from-green-200 via-violet-200 to-blue-200 text-gray-600 font-semibold hover:text-white hover:bg-gradient-to-tr 
          hover:from-gray-500 hover:via-green-600 hover:to-blue-400 shadow-2xl transition-all"
              onClick={handleSubmit}
            >
              <FontAwesomeIcon icon={faPaperPlane} className="flex" />
              Post
            </button>
          </div>
        </div>
        <hr className="w-full border border-gray-300"></hr>
        <div className="flex justify-between">
          <div className="w-full">
            {loading && (
              <span className="flex flex-col justify-center items-center p-4">
                <p className="m-2 text-violet-500 p-2">
                  {messageEntries.length > 0 ? "Posting..." : "Loading..."}
                </p>
                <Loader />
              </span>
            )}
            {messageEntries.length > 0
              ? messageEntries.map(([key, msg]) => (
                  <div
                    key={key}
                    className={`flex items-start p-4 rounded-lg shadow-lg mb-4 ${
                      activeThread === msg.id &&
                      "bg-violet-200 m-4 translate-all duration-200"
                    }`}
                  >
                    <div className="flex-shrink-0 p-2">
                      <img
                        src={msg.photoURL ? msg.photoURL : anonuser}
                        alt="profile"
                        className="w-12 h-12 rounded-lg transition duration-300 transform hover:scale-110 border border-violet-400 mr-4"
                      />
                    </div>
                    <div className="flex flex-col flex-grow min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-lg truncate">
                          {msg.firstName && msg.firstName}
                        </span>
                        <span className="text-sm text-gray-500 opacity-70">
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
                          <p className="break-words">
                            {msg.message && msg.message}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2  ml-[2%]">
                        <div
                          className="cursor-pointer text-gray-600 hover:text-green-800 font-medium rounded transition duration-300 ease-in-out mt-[1%]"
                          onClick={async () => {
                            dispatch(setMessageId(msg.id));
                            handleReplies(msg.id);
                          }} // Pass the index as the message ID
                        >
                          <FontAwesomeIcon icon={faMessage} className="flex" />
                        </div>
                        <div
                          className={`cursor-pointer ${
                            edit && activeThread === msg.id
                              ? "text-green-800"
                              : "text-red-500"
                          } hover:text-blue-800 font-medium  rounded transition duration-300 ease-in-out mt-[0.8%]`}
                          onClick={async () => {
                            dispatch(setMessageId(msg.id));
                            edit && activeThread === msg.id
                              ? handleEditSave(msg.id)
                              : handleEdit(msg.id);
                          }} // Pass the index as the message ID
                        >
                          {edit && activeThread === msg.id ? (
                            <FontAwesomeIcon icon={faSave} className="flex" />
                          ) : (
                            <FontAwesomeIcon icon={faEdit} className="flex" />
                          )}
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
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Communication;

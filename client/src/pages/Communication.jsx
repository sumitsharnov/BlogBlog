import { useSelector } from "react-redux";
import anonuser from "../images/home/anonuser.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { postMessage, getMessages } from "../services/communication_api";
import { useEffect, useState } from "react";
import MessagesCentre from "../components/MessagesCentre";
import TimestampComponent from "../components/TimestampComponent";
import Loader from "../components/Loader";
const Communication = () => {
  const { currentUser, token } = useSelector((state) => state.user);
  const [message, setMessage] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [count, setCount] = useState(0);
  const [messageThread, setMessageThread] = useState("");
  const messageEntries = Object.entries(messageThread).reverse();
  const [user, setUser] = useState(null);
  const displayImage = (user && user[0].photoURL) || anonuser;
  const [showReplies, setShowReplies] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReplies = async (id) => {
    setShowReplies(!showReplies);
    console.log(id, "Ruhi");
  };

  const handleSubmit = async () => {
    if (message.length <= 0) {
      setErrorMessage("Message cannot be empty");
      setCount(count + 1);
      return;
    }
    try {
      setErrorMessage("");
      setCount(count + 1);
      await postMessage(currentUser._id, token, message);
      setErrorMessage(null);
      setMessage([""]);
      await getAllMessages();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const getAllMessages = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      setCount(count + 1);
      const data = await getMessages(currentUser._id, token);
      if (data) {
        setMessageThread(data.messages);
        setUser(data.user);
      }
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  console.log(messageEntries, "Sumit")
  return (
    <>
      {loading ? (
        <span className="flex flex-col justify-center items-center h-screen">
          <Loader />
        </span>
      ) : (
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
              {messageEntries.length > 0 ? (
                messageEntries.map(([key, msg]) => (
                  <div
                    key={key}
                    className="flex items-start p-4 bg-white rounded-lg shadow-lg mb-4"
                  >
                    <div className="flex-shrink-0 p-2">
                      <img
                        src={displayImage}
                        alt="profile"
                        className="w-12 h-12 rounded-lg transition duration-300 transform hover:scale-110 border border-violet-400 mr-4"
                      />
                    </div>
                    <div className="flex flex-col flex-grow min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-lg truncate">
                          {user[0].firstName}
                        </span>
                        <span className="text-sm text-gray-500 opacity-70">
                          <TimestampComponent timestamp={msg.sentAt} />
                        </span>
                      </div>
                      <div
                        className={`mt-2 p-2 bg-gray-100 rounded-lg border border-gray-200 shadow-sm ${
                          showReplies && "w-[40%]"
                        }`}
                      >
                        <p className="break-words">{msg.message}</p>
                      </div>
                      <div
                        className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium py-2 px-4 rounded transition duration-300 ease-in-out"
                        onClick={() => handleReplies(msg.id)} // Pass the index as the message ID
                      >
                        Reply
                      </div>
                    </div>
                  </div>
                ))
              ) : (
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
              <div className="flex justify-between items-center p-4 bg-gray-200 rounded-tl-lg">
                <h3 className="text-lg font-semibold text-violet-600">
                  Threads
                </h3>
                <button
                  className="rounded-full bg-red-500 inline-flex items-center justify-center text-white hover:bg-red-600 focus:outline-none"
                  onClick={() => setShowReplies(false)}
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
              <div className="p-4">
                {/* Container for replies */}
                <div className="space-y-4">
                  {/* Replies will be mapped here */}
                  {/* Example reply */}
                  <div className="p-2 bg-gray-100 rounded-md shadow-inner">
                    <p className="text-sm text-gray-700">
                      Reply 1: This is the first reply.
                    </p>
                  </div>
                  {/* Add more replies as needed */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Communication;

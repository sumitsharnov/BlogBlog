import { useSelector } from "react-redux";
import anonuser from "../images/home/anonuser.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { postMessage, getMessages } from "../services/communication_api";
import { useEffect, useState } from "react";
import MessagesCentre from "../components/MessagesCentre";
const Communication = () => {
  const { currentUser, token } = useSelector((state) => state.user);
  const displayImage = (currentUser && currentUser.photoURL) || anonuser;
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [count, setCount] = useState(0);
  const [messageThread, setMessageThread] = useState("");
  // const {handleSubmit} =
  // useSendMessage(currentUser._id, token, postMessage, message);

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
      setMessage("");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    const getMessagesThread = async () => {
      try {
        setErrorMessage("");
        setCount(count + 1);
        const data = await getMessages(currentUser._id, token);
        data && setMessageThread(data.messages);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    getMessagesThread();
  }, []);

  console.log(messageThread, "Sumit");

  return (
    <div className="min-w-96">
      {errorMessage && (
        <MessagesCentre type={"error"} messageText={errorMessage} key={count} />
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
      {message.length > 0 || messageThread.length > 0 ? (
        <div className="flex justify-items-start p-2 gap-3">
          <img
            src={displayImage}
            alt="profile"
            className="w-12 h-12 rounded-lg transition duration-300 transform hover:scale-110 border border-violet-400"
          />
          <span className="font-semibold">{currentUser.firstName}</span>
        </div>
      ) : (
        <div className="flex justify-center border border-green-300 rounded-lg m-12 p-[10rem]">
          Communication has not been started yet
        </div>
      )}
    </div>
  );
};

export default Communication;

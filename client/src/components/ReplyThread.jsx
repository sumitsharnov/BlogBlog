import PropTypes from "prop-types";
import TimestampComponent from "./TimestampComponent";
import { useCommunication } from "../hooks/useCommunication";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import { setActiveMessage } from "../redux/communications/commSlice";
import { useDispatch} from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faEraser } from "@fortawesome/free-solid-svg-icons";

const ReplyThread = ({ setShowReplies, replyThread }) => {
  const dispatch = useDispatch();
  const {
    newReply,
    setNewReply,
    postAReply,
    loading,
    clearReplyText,
    replyThread: rt,
  } = useCommunication();
  const [replies, setReplies] = useState([]);
  const loadingThreads = replyThread === null ? true : false;
  useEffect(() => {
    replyThread && setReplies(Object.entries(replyThread));
  }, [replyThread]);

  useEffect(() => {
    rt && setReplies(Object.entries(rt));
  }, [rt]);

  console.log(newReply,newReply.toString().trim().length, "Sumit");
  return (
    <>
      <div>
        </div>
        <div className="flex justify-between items-center p-4 bg-gray-200 rounded-tl-lg">
          <h3 className="text-lg font-semibold text-violet-600">Threads</h3>
          <button
            className="rounded-full bg-red-500 inline-flex items-center justify-center text-white hover:bg-red-600 focus:outline-none"
            onClick={() => {setShowReplies(false); dispatch(setActiveMessage(""))}}
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
        <div className="flex justify-center items-center mt-2 ml-2">
          <textarea
            type="text"
            value={newReply}
            placeholder="reply..."
            className={`w-[98%]  p-4 rounded-lg max-h-24 min-h-16  ${
              !newReply ? "border border-gray-950" : "border border-green-500"
            }`}
            onChange={(e) => setNewReply(e.target.value)}
          />
          <div className="flex flex-col p-2 m-1 gap-1">
            <button
              className={`border border-violet-200 rounded-2xl p-2 bg-gradient-to-tr from-green-200 via-violet-200 to-blue-200 text-gray-600 font-semibold hover:text-white hover:bg-gradient-to-tr 
          hover:from-gray-500 hover:via-green-600 hover:to-blue-400 shadow-2xl transition-all`} disabled={newReply.toString().trim().length <= 0}
              onClick={postAReply}
            >
              {/* <FontAwesomeIcon icon={faPaperPlane} className="flex" /> */}
              {<FontAwesomeIcon icon={faReply} className="text-center  transition-all" />}
            </button>
            <button
              className="border border-violet-200 rounded-2xl p-2 bg-gradient-to-tr from-red-200 via-pink-200 to-blue-200 text-gray-600 font-semibold hover:text-white hover:bg-gradient-to-t hover:from-red-400 hover:to-red-300 shadow-2xl transition-all"
              onClick={clearReplyText}
            >
             <FontAwesomeIcon icon={faEraser} className="text-center transition-all" />
            </button>
          </div>
        </div>
        <div className="w-full">
          {loading && newReply.length > 0 &&(
            <span className="flex flex-col justify-center items-center p-2">
              <p className="m-1 text-violet-500 p-1">{"Posting..."}</p>
              <Loader />
            </span>
          )}
        {loadingThreads ? (
          <span className="flex flex-col justify-center items-center p-4">
            <p className="m-2 text-violet-500 p-2">Loading Replies...</p>
            <Loader />
          </span>
        ) : (
          replies &&
          replies.map(([key, thread]) => {
            return (
              <div
                key={key}
                className="flex items-start p-4 bg-white rounded-lg shadow-lg mb-4"
              >
                <div className="flex-shrink-0 p-2">
                  <img
                    src={thread.photoURL && thread.photoURL}
                    alt="profile"
                    className="w-12 h-12 rounded-lg transition duration-300 transform hover:scale-110 border border-violet-400 mr-4"
                  />
                </div>
                <div className="flex flex-col flex-grow min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-lg truncate">
                      {thread.firstName && thread.firstName}
                    </span>
                    <span className="text-sm text-gray-500 opacity-70">
                      {thread.sentAt && (
                        <TimestampComponent timestamp={thread.sentAt} />
                      )}
                    </span>
                  </div>
                  <div
                    className={`mt-2 p-2 bg-gray-100 rounded-lg border border-gray-200 shadow-sm`}
                  >
                    <p className="break-words">
                      {thread.message && thread.message}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default ReplyThread;

ReplyThread.propTypes = {
  setShowReplies: PropTypes.func,
  user: PropTypes.array || PropTypes.object,
  replyThread: PropTypes.array,
};
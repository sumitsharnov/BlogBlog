import PropTypes from "prop-types";
import TimestampComponent from "./TimestampComponent";
import { useCommunication } from "../hooks/useCommunication";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import {
  setActiveMessage,
  setReplyId,
} from "../redux/communications/commSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReply,
  faEraser,
  faEdit,
  faSave,
  faCheckDouble
} from "@fortawesome/free-solid-svg-icons";
import anonuser from "../images/home/anonuser.png";
import Tooltip from "../components/Tooltip";

const ReplyThread = ({ setShowReplies }) => {
  const dispatch = useDispatch();
  const {
    newReply,
    setNewReply,
    postAReply,
    clearReplyText,
    replyThread: rt,
    handleReplyEdit,
    editReply,
    setEditReplyText,
    handleCancelReplyEdit,
    handleEditReplySave,
    editReplyText,
    errorMessage,
    markReplyRead, 
    messageId,
    token
  } = useCommunication();
  const {replyThread} = useSelector((state) => state.comm);
  const { currentUser } = useSelector((state) => state.user);
  const [replies, setReplies] = useState([]);
  const loadingThreads = replyThread === null ? true : false;
  const { replyId, loading} = useSelector((state) => state.comm);
  useEffect(() => {
    replyThread && setReplies(Object.entries(replyThread));
  }, [replyThread]);

  useEffect(() => {
    rt && setReplies(Object.entries(rt));
  }, [rt]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-4 bg-gray-200 rounded-tl-lg">
        <h3 className="text-lg font-semibold text-violet-600">Thread</h3>
        <button
          className="rounded-full bg-red-500 inline-flex items-center justify-center text-white hover:bg-red-600 focus:outline-none"
          onClick={() => {
            setShowReplies(false);
            dispatch(setActiveMessage(""));
          }}
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

      <div className="flex-grow overflow-y-auto">
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
                id={key}
                className={`flex items-start p-4 bg-white rounded-lg shadow-lg mb-4 ${
                  thread.id === replyId &&
                  editReply &&
                  "border border-violet-300 transition-all m-2"
                }`}
              >
                <div className="flex-shrink-0 p-2">
                  <img
                    src={thread.photoURL ? thread.photoURL : anonuser}
                    alt="profile"
                    className="w-12 h-12 rounded-lg transition duration-300 transform hover:scale-110 border border-violet-400 mr-4"
                  />
                </div>
                <div className="flex flex-col flex-grow min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-lg truncate">
                      {thread.firstName && thread.firstName}
                    </span>
                    <div
                      className="text-sm text-gray-500 opacity-70"
                      key={thread.id}
                    >
                      {thread.sentAt && (
                        <TimestampComponent
                          timestamp={thread.sentAt && thread.sentAt}
                          key={key}
                        />
                      )}
                    </div>
                  </div>
                  <div
                    className={`mt-2 p-2 bg-gray-100 rounded-lg border border-gray-200 shadow-sm`}
                  >
                    {editReply && thread.id === replyId ? (
                      <div className="flex flex-col">
                        <textarea
                          defaultValue={thread.message}
                          onChange={(e) => setEditReplyText(e.target.value)}
                          className="w-[100%] p-1 mr-[1.5rem] max-h-48 focus:outline-none shadow-stone-800"
                        />
                        <div className="flex gap-1">
                          {editReply &&
                            thread.id === replyId &&
                            thread.message.trim() !== editReplyText.trim() &&
                            editReplyText.trim() !== "" && (
                              <button
                                onClick={() =>
                                  handleEditReplySave(thread.id, thread.message)
                                }
                                className="rounded-full bg-green-500 inline-flex items-center justify-center text-white hover:bg-green-600 focus:outline-none w-full mt-1 transition-all"
                              >
                                <FontAwesomeIcon
                                  icon={faSave}
                                  className="flex justify-center items-center p-1"
                                />
                              </button>
                            )}

                          <button
                            onClick={handleCancelReplyEdit}
                            className="rounded-full bg-gray-400 inline-flex items-center justify-center text-white hover:bg-red-600 focus:outline-none w-full mt-1 transition-all"
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
                      </div>
                    ) : loading && replyId === thread.id ? (
                      <span className="p-2 flex text-gray-300">
                        <Loader width={2} height={2} />
                      </span>
                    ) : (
                      <div
                        onClick={() => {currentUser._id !== thread.user && markReplyRead(thread.id, messageId, token)}}
                        className={`break-words rounded-md shadow-md p-2 duration-300 ease-in-out relative group hover:cursor-pointer  transition-all animate-bounce${
                          !thread.read ?
                          currentUser._id !== thread.user &&
                            "bg-purple-100 border-l-4 border-purple-500 text-purple-700 hover:text-purple-900 hover:font-medium font-bold"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        
                        {thread.message && thread.message}{" "}
                        {thread.read ? (
                              <span className="absolute top-0 right-0 h-2 w-2 bg-purple-500 rounded-full"></span>
                            ) : (
                              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                            )}
                       
                        <span className="p-1 text-gray-500 font-light">
                          {thread.edit && "(edited)"}
                        </span>
                        {thread.read || currentUser._id !== thread.user &&  <div className="w-72 h-auto">
                              <Tooltip message="Message will be marked Read when clicked; sender will be notified"></Tooltip>
                            </div>}
                      </div>
                    )}
                  </div>
                  <div
                    className={`cursor-pointer ${
                      editReply && thread.id === replyId
                        ? "text-green-800"
                        : "text-red-500"
                    } hover:text-blue-800 font-medium  rounded transition duration-300 ease-in-out -mt-[.1rem] flex gap-1`}
                    onClick={async () => {
                      dispatch(setReplyId(thread.id));
                      (editReply && thread.id === replyId) ||
                        handleReplyEdit(thread.id, thread.message);
                    }} // Pass the index as the message ID
                  >
                    {(editReply && replyId === thread.id) ||
                      (thread.user === currentUser._id && (
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="flex mt-1 ml-2"
                        />
                      ))}
                      {currentUser._id === thread.user &&
                          (thread.read ? (
                            <Tooltip message="Read">
                              <span className="text-gray-500 cursor-pointer">
                                <FontAwesomeIcon
                                  icon={faCheckDouble}
                                  className="flex text-blue-500 p-[.3rem]"
                                />
                              </span>
                            </Tooltip>
                          ) : (
                            <Tooltip message="Sent">
                              <span className="text-gray-500 cursor-pointer">
                                <FontAwesomeIcon
                                  icon={faCheckDouble}
                                  className="flex text-gray-500 p-[.3rem]"
                                />
                              </span>
                            </Tooltip>
                          ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="flex flex-col border-t border-gray-300 ">
        {errorMessage && <p className="p-2 text-red-700">{errorMessage}</p>}
        {loading && newReply.length > 0 && (
          <span className="flex flex-col items-center justify-center">
            <p className="m-1 text-violet-500 p-1">{"Posting..."}</p>
            <Loader height={2} width={2} />
          </span>
        )}
        <div className="flex p-4 ">
          <textarea
            type="text"
            value={newReply}
            placeholder="reply..."
            className={`w-[98%] p-4 rounded-lg max-h-24 min-h-16 ${
              !newReply ? "border border-gray-950" : "border border-green-500"
            }`}
            onChange={(e) => setNewReply(e.target.value)}
          />
          <div className="flex flex-col p-2 m-1 gap-1">
            <button
              className={`border border-violet-200 rounded-2xl p-2 bg-gradient-to-tr from-green-200 via-violet-200 to-blue-200 text-gray-600 font-semibold hover:text-white hover:bg-gradient-to-tr 
            hover:from-gray-500 hover:via-green-600 hover:to-blue-400 shadow-2xl transition-all`}
              disabled={newReply.toString().trim().length <= 0}
              onClick={postAReply}
            >
              <FontAwesomeIcon
                icon={faReply}
                className="text-center  transition-all"
              />
            </button>
            <button
              className="border border-violet-200 rounded-2xl p-2 bg-gradient-to-tr from-red-200 via-pink-200 to-blue-200 text-gray-600 font-semibold hover:text-white hover:bg-gradient-to-t hover:from-red-400 hover:to-red-300 shadow-2xl transition-all"
              onClick={clearReplyText}
            >
              <FontAwesomeIcon
                icon={faEraser}
                className="text-center transition-all"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyThread;

ReplyThread.propTypes = {
  setShowReplies: PropTypes.func,
  user: PropTypes.array || PropTypes.object,
  replyThread: PropTypes.array,
};

import PropTypes from "prop-types";
import anonuser from "../images/home/anonuser.png";
import TimestampComponent from "./TimestampComponent";

const ReplyThread = ({ setShowReplies, replyThread }) => {
    console.log((replyThread.replyThread && replyThread.replyThread), "Mehta");
  return (
    <>
      <div className="flex justify-between items-center p-4 bg-gray-200 rounded-tl-lg">
        <h3 className="text-lg font-semibold text-violet-600">Threads</h3>
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
      {
      <div>{replyThread.replyThread && (replyThread.replyThread)[0].firstName}</div>
    //    <div>Sumit</div>
    //    replies.map((thread) => {
    //       <div className="p-4">
    //         <div className="flex-shrink-0 p-2">
    //           <img
    //             src={thread[1].photoURL}
    //             alt="profile"
    //             className="w-12 h-12 rounded-lg transition duration-300 transform hover:scale-110 border border-violet-400 mr-4"
    //           />
    //         </div>
    //         <div className="flex flex-col flex-grow min-w-0">
    //           <div className="flex items-center gap-2">
    //             <span className="font-medium text-lg truncate">
    //               {thread[1].firstName && thread[1].firstName}
    //               Sumit
    //             </span>
    //             <span className="text-sm text-gray-500 opacity-70">
    //               {/* <TimestampComponent timestamp={msg.sentAt} /> */}
    //             </span>
    //           </div>
    //         </div>
    //         {/* Container for replies */}
    //         <div className="space-y-4">
    //           {/* Replies will be mapped here */}
    //           {/* Example reply */}
    //           <div className="p-2 bg-gray-100 rounded-md shadow-inner">
    //             <p className="text-sm text-gray-700">
    //               Reply 1: This is the first reply.
    //             </p>
    //           </div>
    //           {/* Add more replies as needed */}
    //         </div>
    //       </div>;
    //     })
        }
    </>
  );
};

export default ReplyThread;

ReplyThread.propTypes = {
  setShowReplies: PropTypes.func,
  user: PropTypes.array || PropTypes.object,
  replyThread: PropTypes.object,
};

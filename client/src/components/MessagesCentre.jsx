import { useState, useEffect } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

function MessagesCentre({ type, messageText, click }) {
  const [message, setMessage] = useState(messageText);
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    setMessage(messageText);
    setIsVisible(true);
    setProgress(100);
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress <= 0) {
          clearInterval(interval);
          return 0;
        }
        return oldProgress - 1.8; // Adjust this value to match the message disappearance
      });
    }, 100);
  }, [messageText, click]);

  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 5000); // 5 seconds
      return () => clearTimeout(timeoutId);
    }
  }, [message]); // Add message as a dependency here

  const handleClose = () => {
    setIsVisible(false);
  };

  // Conditionally render the message
  return (
    <>
      {message && isVisible && (
        <div className="fixed top-16 w-1/6 mt-2 right-1 z-50 max-w-xs">
          {type === "error" && (
            <div className="flex-row sm:flex items-center justify-between bg-red-300 w-full rounded-md border border-gray-300 px-3 py-2 relative">
              <span className="text-start mr-2">{message}</span>
              <button onClick={handleClose} className="text-red-500">
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <div className="h-1 bg-gray-200 absolute bottom-0 left-0 w-full">
                <div
                  className="h-full bg-red-500 transition-all duration-5000 ease-linear"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
          {type === "success" && (
            <div className="flex-row sm:flex items-center justify-between bg-green-500 w-full rounded-md border border-gray-300 px-3 py-2 relative">
              <span className="text-start mr-2 text-white">{message}</span>
              <button onClick={handleClose} className="text-white">
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <div className="h-1 bg-gray-200 absolute bottom-0 left-0 w-full">
                <div
                  className="h-full bg-green-950 transition-all duration-5000 ease-linear"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

MessagesCentre.propTypes = {
  messageText: PropTypes.string,
  type: PropTypes.string,
  click: PropTypes.number,
};

export default MessagesCentre;

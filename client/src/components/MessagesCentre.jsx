import { useState, useEffect } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { set } from "mongoose";

function MessagesCentre({ type, messageText, click }) {
  const [message, setMessage] = useState(messageText);

  // Log the click prop value to check if it changes
  useEffect(() => {
    setMessage(messageText);
  }, [click]);

  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        setMessage(null);
      }, 10000); // 10 seconds
      return () => clearTimeout(timeoutId);
    }
  }); // Add message as a dependency here

  const handleClose = () => {
    setMessage(null);
  };

  // Conditionally render the message
  return (
    <>
      {message && (
        <div className="fixed top-16 w-1/6 mt-2 right-1 z-50 max-w-xs">
          {type === "error" && (
            <div className="flex-row sm:flex items-center justify-between bg-red-300 w-full rounded-md border border-gray-300 px-3 py-2">
              <span className="text-start mr-2">{message}</span>
              <button onClick={handleClose} className="text-red-500">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          )}
          {type === "success" && (
            <div className="flex-row sm:flex items-center justify-between bg-green-300 w-full rounded-md border border-gray-300 px-3 py-2">
              <span className="text-start mr-2 text-gray-500">{message}</span>
              <button onClick={handleClose} className="text-gray-500">
                <FontAwesomeIcon icon={faTimes} />
              </button>
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

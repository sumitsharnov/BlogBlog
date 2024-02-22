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
    // Cleanup interval when unmounting or when message changes
    return () => clearInterval(interval);
  }, [messageText, click]);

  useEffect(() => {
    // Set isVisible to false after 5 seconds
    if (message) {
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 5000); // 5 seconds
      // Clear timeout when unmounting or when message changes
      return () => clearTimeout(timeoutId);
    }
  }, [message]);

  const handleClose = () => {
    setIsVisible(false); // Hide message immediately when closing
  };

  const handleAnimationEnd = () => {
    if (!isVisible) {
      setMessage(""); // Clear message when animation ends
    }
  };

  // Conditionally render the message
  return (
    <div className="absolute top-16 right-2  overflow-hidden p-2">
      {message && (
        <div
          className={`top-16 mb-20 w-full mt-2 right-1 z-50 max-w-xsz ${
            isVisible ? "animate-slideIn" : "animate-slideOut"
          }`}
          onAnimationEnd={handleAnimationEnd}
          style={{
            animationDuration: isVisible ? "0.5s" : "0.5s",
          }}
        >
          {type === "error" && (
            <div className="flex-row flex items-center justify-between bg-red-300 w-full rounded-md border border-gray-300 px-3 py-2 relative">
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
            <div className="flex-row flex items-center justify-between bg-green-500 w-full rounded-md border border-gray-300 px-3 py-2 relative">
              <span className="text-start mr-2 text-white">{message}</span>
              <button onClick={handleClose} className="text-white">
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <div className="h-1 bg-gray-200 absolute bottom-0 left-0 w-full">
                <div
                  className="h-full bg-teal-500 transition-all duration-5000 ease-linear"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

MessagesCentre.propTypes = {
  messageText: PropTypes.string,
  type: PropTypes.string,
  click: PropTypes.number,
};

export default MessagesCentre;

// CSS for sliding animations
const css = `
/* Define the sliding in animation */
@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Define the sliding out animation */
@keyframes slideOut {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

/* Apply the animations to the appropriate elements */
.animate-slideIn {
  animation: slideIn 0.5s ease forwards;
}

.animate-slideOut {
  animation: slideOut 0.5s ease forwards;
}
`;

// Inject CSS into the document
const style = document.createElement("style");
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);

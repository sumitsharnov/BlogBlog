import { useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

function MessagesCentre({ type, messageText, key }) {
  const [message, setMessage] = useState(messageText);
  switch (type) {
    case "error":
      return (
        message && (
          <div
            key={key}
            className="fixed top-16 w-1/6 mt-2 right-1 z-50 max-w-xs"
          >
            <div className=" flex-row sm:flex items-center justify-between bg-red-300 w-full rounded-md border border-gray-300 px-3 py-2">
              <span className="text-start mr-2">{message}</span>
              <button onClick={() => setMessage(null)} className="text-red-500">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        )
      );
    case "success":
      return (
        message && (
          <div
            key={key}
            className="fixed top-16 w-1/6 mt-2 right-1 z-50 max-w-xs"
          >
            <div className=" flex-row sm:flex items-center justify-between bg-green-300 w-full rounded-md border border-gray-300 px-3 py-2">
              <span className="text-start mr-2 text-gray-500">{message}</span>
              <button onClick={() => setMessage(null)} className="text-gray-500">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        )
      );
  }
}

MessagesCentre.propTypes = {
  messageText: PropTypes.string,
  type: PropTypes.string,
  key: PropTypes.number,
};

export default MessagesCentre;

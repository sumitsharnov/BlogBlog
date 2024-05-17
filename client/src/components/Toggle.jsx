import "../../styles.css";
import PropTypes from "prop-types";
export function Toggle({ popup, handleToggle, checked, handlePopup }) {
  return (
    <div>
      {popup && checked && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-10 border-2 hover:border-red-500 rounded-lg shadow-2xl transform transition-all duration-300 hover:scale-105">
            <div className="flex flex-row justify-start items-center space-x-3 mt-2">
              <label
                htmlFor="isRecruiter"
                className="font-medium text-gray-700"
              >
                This will change your Recruiter status with us, do you still
                want to proceed ?
              </label>
            </div>

            <div className="flex justify-end mt-4 space-x-4">
              <button
                className="bg-blue-500 hover:bg-red-400 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                onClick={handleToggle}
              >
                Proceed
              </button>

              <button
                className="bg-gray-300 hover:bg-green-400 text-gray-700 hover:text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                onClick={handlePopup} // Close the pop-up on cancel
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <label className="switch">
        <input
          checked={checked}
          type="checkbox"
          onChange={checked ? handlePopup : handleToggle}
        />
        <div className="slider">
          <div className="circle">
            <svg
              className="cross"
              xmlSpace="preserve"
              viewBox="0 0 365.696 365.696"
              y="0"
              x="0"
              height="6"
              width="6"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  data-original="#000000"
                  fill="currentColor"
                  d="M243.188 182.86 356.32 69.726c12.5-12.5 12.5-32.766 0-45.247L341.238 9.398c-12.504-12.503-32.77-12.503-45.25 0L182.86 122.528 69.727 9.374c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.457c-12.5 12.504-12.5 32.77 0 45.25l113.152 113.152L9.398 295.99c-12.503 12.503-12.503 32.769 0 45.25L24.48 356.32c12.5 12.5 32.766 12.5 45.247 0l113.132-113.132L295.99 356.32c12.503 12.5 32.769 12.5 45.25 0l15.081-15.082c12.5-12.504 12.5-32.77 0-45.25zm0 0"
                ></path>
              </g>
            </svg>
            <svg
              className="checkmark"
              xmlSpace="preserve"
              viewBox="0 0 24 24"
              y="0"
              x="0"
              height="10"
              width="10"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  className=""
                  data-original="#000000"
                  fill="currentColor"
                  d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                ></path>
              </g>
            </svg>
          </div>
        </div>
      </label>
    </div>
  );
}

Toggle.propTypes = {
  handleToggle: PropTypes.func,
  popup: PropTypes.bool,
  checked: PropTypes.bool,
  handlePopup: PropTypes.func,
};

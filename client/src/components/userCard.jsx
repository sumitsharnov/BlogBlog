import "../../styles.css";
import PropTypes from "prop-types";
import MessagesCentre from "./MessagesCentre";
import { Toggle } from "./Toggle";

export function UserCard({
  user,
  truncateFileName,
  handleUpload,
  handleFileSelection,
  handleCancel,
  displayImage,
  errorMessage,
  updateClicks,
  file,
  handleOptions,
  options,
  handleToggle,
  popup,
  checked,
  handlePopup,
  handleDelete,
}) {
  return (
    <>
      {errorMessage && (
        <MessagesCentre
          messageText={errorMessage}
          type={"error"}
          click={updateClicks}
          top={16}
          mt={0}
        />
      )}
      <div className="card w-[70%] h-[60vh]">
        <button className="mail m-4">
          {options ? (
            <div className="flex md:flex-row flex-col justify-center items-center lg:gap-4 gap-1 w-full">
              {file && (
                <span
                  className="lg:inline-block hidden p-4 border rounded-xl disabled ml-2 max-w-[12rem]"
                  title={file?.name} // Set the tooltip content to the full file name
                  data-multiline="true" // Allow multiline content in tooltip
                >
                  <span className="mr-2 text-gray-500">
                    File Info: {file && truncateFileName(file.name, 20)}
                  </span>
                  <span className="mr-2 text-gray-500">
                    {file && `(${Math.floor(file.size / 1000)} KB)`}
                  </span>
                </span>
              )}
              <label htmlFor="fileInput" className={`relative cursor-pointer`}>
                <span
                  className="max-h-[3rem] flex justify-center items-center bg-teal-500 hover:bg-white hover:text-teal-500 hover:border-2 focus:bg-green-600 focus:outline-none text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:translate-x-2 cursor-pointer"
                  // onClick={handleUpload}
                >
                  Select File
                </span>

                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={handleFileSelection} // Handle file selection here
                />
              </label>
              <div
                className={`max-h-[3rem] flex justify-center items-center ${
                  file ? "bg-green-500" : "bg-red-500"
                } hover:bg-white ${
                  file ? "hover:text-green-500" : "hover:text-red-500"
                }  hover:border-2 focus:bg-green-600 focus:outline-none text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:translate-x-2 cursor-pointer
                ${!file && user.photoURL.includes("anonuser") && "hidden"}`}
                onClick={file ? handleUpload : handleDelete}
              >
                {file ? "Update" : "Delete"}
              </div>
              <span
                className="max-h-[3rem] flex justify-center items-center bg-gray-500 hover:bg-white focus:bg-red-600 focus:outline-none text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:-translate-x-2 cursor-pointer hover:text-gray-500 hover:border-2"
                onClick={handleCancel}
              >
                Cancel
              </span>
            </div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-mail"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
          )}
        </button>

        <div className="profile-pic-main rounded-full">
          {user.type === "user" ? (
            <>
              <div className="absolute opacity-0 hover:opacity-50 text-white z-10 h-full w-[6rem] text-center mt-[2rem] transition duration-300 transform hover:translate-y-1 hover:shadow-lg">
                <span
                  className="block bg-blue-500 rounded-md ml-2 cursor-pointer"
                  onClick={handleOptions}
                >
                  Update
                </span>
              </div>

              <img
                src={displayImage}
                className="border-4 border-white rounded-full"
              />
            </>
          ) : (
            <img
              src={displayImage}
              className="border-4 border-white rounded-full"
            />
          )}
        </div>
        <div className="profile-pic">
          <svg
            version="1.1"
            id="svg2"
            width="666.66669"
            height="666.66669"
            viewBox="0 0 666.66669 666.66669"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs id="defs6">
              <clipPath clipPathUnits="userSpaceOnUse" id="clipPath408">
                <path
                  d="m 699.926,0 h 3600.16 V 4818.31 H 699.926 Z"
                  id="path406"
                ></path>
              </clipPath>
            </defs>
            <g id="g8" transform="matrix(1.3333333,0,0,-1.3333333,0,666.66667)">
              <g id="g10" transform="scale(0.1)">
                <path
                  d="M 0,0 H 5000 V 5000 H 0 Z"
                  style={{
                    fill: "#fff8f6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path12"
                ></path>
                <path
                  d="M 0,1126.2 H 4487.25 V 5000 H 0 Z"
                  style={{
                    fill: "#fef0ef",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path14"
                ></path>
                <path
                  d="M 5000,561.691 4487.25,1126.2 V 5000 H 5000 V 561.691"
                  style={{
                    fill: "#fde4e1",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path16"
                ></path>
                <path
                  d="M 4487.25,1146.2 5000,590.422 V 530.859 L 4487.25,1106.22 0,1106.2 v 40 h 4487.25"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path18"
                ></path>
                <path
                  d="m 914.891,2652.86 h 2369.21 V 4428.88 H 914.891 Z"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path20"
                ></path>
                <path
                  d="m 995.844,2713.15 h 2207.3 v 1655.44 h -2207.3 z"
                  style={{
                    fill: "#fdeae9",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path22"
                ></path>
                <path
                  d="M 2914.29,4139.24 H 1284.71 v 127.31 h 1629.58 v -127.31"
                  style={{
                    fill: "#fff8f6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path24"
                ></path>
                <path
                  d="m 1349.04,2921.58 h -126.83 v 318.43 h 126.83 v -318.43"
                  style={{
                    fill: "#fff8f6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path26"
                ></path>
                <path
                  d="m 1634.86,3519.55 h -126.83 v -597.97 h 126.83 v 597.97"
                  style={{
                    fill: "#fff8f6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path28"
                ></path>
                <path
                  d="m 1920.68,3457.72 h -126.84 v -536.14 h 126.84 v 536.14"
                  style={{
                    fill: "#fff8f6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path30"
                ></path>
                <path
                  d="m 2079.66,2921.58 h 126.828 v 838.84 H 2079.66 Z"
                  style={{
                    fill: "#fff8f6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path32"
                ></path>
                <path
                  d="M 2699.39,2833.93 H 1138.44 v 1154 h 17.32 V 2851.25 h 1543.63 v -17.32"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path34"
                ></path>
                <path
                  d="m 1278.36,3412.46 -11.56,12.89 296.95,266.64 275.05,-59.75 297.83,331.57 12.89,-11.57 -304.57,-339.06 -276.22,60 -290.37,-260.72"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path36"
                ></path>
                <path
                  d="m 2172.85,3903.25 -83.98,80.53 108.42,29.01 z"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path38"
                ></path>
                <path
                  d="m 3051.89,3946.91 h -579.93 v 22.73 h 579.93 v -22.73"
                  style={{
                    fill: "#fff8f6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path40"
                ></path>
                <path
                  d="m 3051.89,3891.89 h -658.23 v 22.72 h 658.23 v -22.72"
                  style={{
                    fill: "#fff8f6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path42"
                ></path>
                <path
                  d="m 3051.89,3836.86 h -658.23 v 22.73 h 658.23 v -22.73"
                  style={{
                    fill: "#fff8f6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path44"
                ></path>
                <path
                  d="m 3051.89,3781.84 h -658.23 v 22.72 h 658.23 v -22.72"
                  style={{
                    fill: "#fff8f6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path46"
                ></path>
                <path
                  d="m 3051.89,3726.81 h -658.23 v 22.73 h 658.23 v -22.73"
                  style={{
                    fill: "#fff8f6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path48"
                ></path>
                <path
                  d="m 3051.89,3671.78 h -658.23 v 22.73 h 658.23 v -22.73"
                  style={{
                    fill: "#fff8f6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path50"
                ></path>
                <path
                  d="m 3051.89,3616.76 h -658.23 v 22.72 h 658.23 v -22.72"
                  style={{
                    fill: "#fff8f6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path52"
                ></path>
                <path
                  d="m 3051.89,3561.73 h -658.23 v 22.73 h 658.23 v -22.73"
                  style={{
                    fill: "#fff8f6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path54"
                ></path>
                <path
                  d="m 3051.89,3506.7 h -658.23 v 22.73 h 658.23 v -22.73"
                  style={{
                    fill: "#fff8f6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path56"
                ></path>
                <path
                  d="m 2393.66,3451.68 h 658.23 v 22.7188 h -658.23 z"
                  style={{
                    fill: "#fff8f6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path58"
                ></path>
                <path
                  d="m 2393.66,3396.65 h 658.23 v 22.7227 h -658.23 z"
                  style={{
                    fill: "#fff8f6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path60"
                ></path>
                <path
                  d="m 3051.89,3341.62 h -658.23 v 22.73 h 658.23 v -22.73"
                  style={{
                    fill: "#fff8f6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path62"
                ></path>
                <path
                  d="m 3051.89,3286.6 h -658.23 v 22.72 h 658.23 v -22.72"
                  style={{
                    fill: "#fff8f6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path64"
                ></path>
                <path
                  d="m 3051.89,3231.57 h -658.23 v 22.73 h 658.23 v -22.73"
                  style={{
                    fill: "#fff8f6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path66"
                ></path>
                <path
                  d="m 3051.89,3176.54 h -658.23 v 22.73 h 658.23 v -22.73"
                  style={{
                    fill: "#fff8f6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path68"
                ></path>
                <path
                  d="m 3051.89,3121.52 h -658.23 v 22.72 h 658.23 v -22.72"
                  style={{
                    fill: "#fff8f6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path70"
                ></path>
                <path
                  d="m 3051.89,3066.49 h -658.23 v 22.72 h 658.23 v -22.72"
                  style={{
                    fill: "#fff8f6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path72"
                ></path>
                <path
                  d="m 3051.89,3011.46 h -658.23 v 22.72 h 658.23 v -22.72"
                  style={{
                    fill: "#fff8f6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path74"
                ></path>
                <path
                  d="m 3051.89,2956.44 h -289.96 v 22.72 h 289.96 v -22.72"
                  style={{
                    fill: "#fff8f6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path76"
                ></path>
                <path
                  d="m 3661.18,4380.23 c -149.67,0 -271.42,-121.76 -271.42,-271.42 0,-149.66 121.75,-271.42 271.42,-271.42 149.66,0 271.42,121.76 271.42,271.42 0,149.66 -121.76,271.42 -271.42,271.42 z m 0,-574.43 c -167.08,0 -303.02,135.93 -303.02,303.01 0,167.08 135.94,303.01 303.02,303.01 167.08,0 303.01,-135.93 303.01,-303.01 0,-167.08 -135.93,-303.01 -303.01,-303.01"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path78"
                ></path>
                <path
                  d="m 3846.4,4108.81 v 0 c 0,8.44 6.9,15.34 15.35,15.34 h 26.3 c 8.43,0 15.34,-6.9 15.34,-15.34 0,-8.44 -6.91,-15.34 -15.34,-15.34 h -26.3 c -8.45,0 -15.35,6.9 -15.35,15.34"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path80"
                ></path>
                <path
                  d="m 3418.96,4108.81 v 0 c 0,8.44 6.91,15.34 15.36,15.34 h 26.3 c 8.43,0 15.34,-6.9 15.34,-15.34 0,-8.44 -6.91,-15.34 -15.34,-15.34 h -26.3 c -8.45,0 -15.36,6.9 -15.36,15.34"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path82"
                ></path>
                <path
                  d="m 3661.18,3923.59 v 0 c 8.44,0 15.34,-6.91 15.34,-15.34 v -26.31 c 0,-8.43 -6.9,-15.34 -15.34,-15.34 -8.44,0 -15.34,6.91 -15.34,15.34 v 26.31 c 0,8.43 6.9,15.34 15.34,15.34"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path84"
                ></path>
                <path
                  d="m 3661.18,4351.02 v 0 c 8.44,0 15.34,-6.9 15.34,-15.34 v -26.3 c 0,-8.45 -6.9,-15.35 -15.34,-15.35 -8.44,0 -15.34,6.9 -15.34,15.35 v 26.3 c 0,8.44 6.9,15.34 15.34,15.34"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path86"
                ></path>
                <path
                  d="m 3530.21,3977.84 v 0 c 5.97,-5.97 5.97,-15.74 0,-21.7 l -18.6,-18.6 c -5.97,-5.97 -15.73,-5.97 -21.7,0 -5.96,5.97 -5.96,15.73 0,21.7 l 18.61,18.6 c 5.96,5.97 15.72,5.97 21.69,0"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path88"
                ></path>
                <path
                  d="m 3832.45,4280.08 v 0 c 5.97,-5.97 5.97,-15.73 0,-21.7 l -18.6,-18.6 c -5.97,-5.97 -15.73,-5.97 -21.7,0 -5.97,5.97 -5.97,15.73 0,21.7 l 18.6,18.6 c 5.97,5.97 15.73,5.97 21.7,0"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path90"
                ></path>
                <path
                  d="m 3530.21,4239.78 v 0 c -5.97,-5.97 -15.73,-5.97 -21.69,0 l -18.61,18.6 c -5.96,5.97 -5.96,15.73 0,21.7 5.97,5.97 15.73,5.97 21.7,0 l 18.6,-18.6 c 5.97,-5.97 5.97,-15.73 0,-21.7"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path92"
                ></path>
                <path
                  d="m 3832.45,3937.54 v 0 c -5.97,-5.97 -15.73,-5.97 -21.7,0 l -18.6,18.6 c -5.97,5.96 -5.97,15.73 0,21.7 5.97,5.97 15.73,5.97 21.7,0 l 18.6,-18.6 c 5.97,-5.97 5.97,-15.73 0,-21.7"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path94"
                ></path>
                <path
                  d="m 3686.25,4108.81 c 0,-13.85 -11.22,-25.07 -25.07,-25.07 -13.85,0 -25.07,11.22 -25.07,25.07 0,13.84 11.22,25.07 25.07,25.07 13.85,0 25.07,-11.23 25.07,-25.07"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path96"
                ></path>
                <path
                  d="m 3661.18,4140.21 v 0 c -2.68,0 -4.87,2.18 -4.87,4.87 v 128.11 c 0,2.69 2.19,4.87 4.87,4.87 2.69,0 4.87,-2.18 4.87,-4.87 v -128.11 c 0,-2.69 -2.18,-4.87 -4.87,-4.87"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path98"
                ></path>
                <path
                  d="m 3695.75,4108.81 v 0 c 0,2.69 2.18,4.87 4.87,4.87 h 84.62 c 2.69,0 4.87,-2.18 4.87,-4.87 0,-2.69 -2.18,-4.87 -4.87,-4.87 h -84.62 c -2.69,0 -4.87,2.18 -4.87,4.87"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path100"
                ></path>
                <path
                  d="m 2811.08,1683.91 h -78.68 v 281.2 h 78.68 v -281.2"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path102"
                ></path>
                <path
                  d="m 2734.9,1686.41 h 73.68 v 276.2 h -73.68 z m 78.68,-5 h -83.68 v 286.2 h 83.68 v -286.2"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path104"
                ></path>
                <path
                  d="m 2790.73,1756.66 h -37.98 v 178.52 h 37.98 v -178.52"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path106"
                ></path>
                <path
                  d="m 2757.74,1761.66 h 28 v 168.53 h -28 z m 37.98,-9.99 h -47.97 v 188.51 h 47.97 v -188.51"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path108"
                ></path>
                <path
                  d="m 2968.46,1683.91 h -78.68 v 281.2 h 78.68 v -281.2"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path110"
                ></path>
                <path
                  d="m 2892.27,1686.41 h 73.69 v 276.2 h -73.69 z m 78.69,-5 h -83.68 v 286.2 h 83.68 v -286.2"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path112"
                ></path>
                <path
                  d="m 2948.11,1756.66 h -37.98 v 178.52 h 37.98 v -178.52"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path114"
                ></path>
                <path
                  d="m 2915.12,1761.66 h 27.99 v 168.53 h -27.99 z m 37.98,-9.99 h -47.96 v 188.51 h 47.96 v -188.51"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path116"
                ></path>
                <path
                  d="m 2889.78,1683.91 h -78.7 v 281.2 h 78.7 v -281.2"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path118"
                ></path>
                <path
                  d="m 2869.41,1756.66 h -37.97 v 178.52 h 37.97 v -178.52"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path120"
                ></path>
                <path
                  d="m 1071.52,2645.58 c 6.16,10.04 33.79,32.89 40.36,42.67 18.94,28.26 52.01,77.18 82.18,97.67 9.51,6.46 40.24,10.88 43.61,5.2 4.02,-6.77 -11.83,-7.71 -26.78,-14 -8.95,-3.76 -11.3,-13.34 -15.68,-19.31 9.07,-2.61 16.3,-6.1 12.79,-14.85 11.28,-1.69 15.53,-7.56 13.48,-18.77 22.62,-5.78 -13.1,-41.1 -21.58,-48.72 -5.52,-4.96 -11.55,-9.71 -18.69,-11.72 -7.15,-2.03 -24.27,-3.38 -29.15,2.21 -16.16,-11.71 -39.82,-43.31 -39.82,-43.31"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path122"
                ></path>
                <path
                  d="m 692.59,786.012 41.078,0.449 c -0.172,-19.129 67.852,-36.16 97.129,-55.352 8.641,-5.66 24.715,-16.769 14.359,-26.8 -6.176,-5.977 -19.433,-8.028 -28.218,-7.809 -36.223,0.91 -73.047,0.23 -106.372,12.148 -13.382,4.801 -27.679,11.774 -31.25,23.571 -4.714,15.601 13.614,26.902 13.274,53.793"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path124"
                ></path>
                <path
                  d="m 236.465,771.34 40.199,0.449 c -0.164,-19.117 66.285,-36.168 94.902,-55.348 8.446,-5.671 24.157,-16.781 14.036,-26.812 -6.036,-5.981 -19,-8.02 -27.582,-7.797 -35.418,0.898 -71.403,0.219 -103.977,12.137 -13.082,4.801 -27.063,11.773 -30.547,23.57 -4.613,15.602 13.305,26.902 12.969,53.801"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path126"
                ></path>
                <path
                  d="m 729.652,2025.12 c 53.004,-269.56 53.004,-393.22 59.426,-591.82 7.797,-241.24 -28.414,-464.909 -42.637,-662.652 0,0 -30.484,-14.789 -57.668,-0.699 -25.941,120.86 -102.625,346.171 -76.082,506.411 4.77,28.79 8.68,57.72 9.028,86.9 0.82,68.39 -193.637,395.15 -154.762,707.41"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path128"
                ></path>
                <path
                  d="m 551.762,2116.81 c 17.89,-176.45 -66.153,-599.99 -99.133,-763.54 -43.027,-213.38 -153.652,-563.45 -161.09,-597.239 -14.199,-9.531 -56.805,0.711 -56.805,0.711 -2.468,162.406 -44.211,378.558 13.246,533.038 10.321,27.75 21.661,55.54 25.09,84.57 3.258,27.56 -93.257,338.29 -76.437,470.17 8.887,69.68 33.719,153.77 94.676,229.93"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path130"
                ></path>
                <path
                  d="m 537.809,1839.29 c -7.496,-46.72 -14.192,-93.54 -19.926,-140.51 -0.578,-4.72 -1.211,-9.42 -1.699,-14.15 -0.129,-1.25 -0.383,-2.56 -0.301,-3.81 0.058,-0.94 -0.113,-3.07 0.133,-1.21 -0.364,-2.73 3.933,-2.71 4.293,0 -0.352,-2.65 -0.075,-0.86 0.242,0.24 0.301,1.02 0.488,2.01 0.664,3.06 0.633,3.81 1.144,7.64 1.691,11.46 1.813,12.68 3.731,25.36 5.356,38.07 3.703,28.85 7.422,57.71 10.453,86.63 0.695,6.6 1.387,13.22 2.078,19.82 0.18,1.69 -2.719,2.1 -2.984,0.4"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path132"
                ></path>
                <path
                  d="m 332.875,2756.77 c 29.961,31.32 84.684,18.2 127.605,24.28 33.36,4.73 66.715,9.46 100.079,14.18 7.953,1.13 16.046,2.26 23.984,1.02 11.52,-1.81 21.645,-8.4 31.363,-14.84 27.848,-18.44 55.696,-36.88 83.547,-55.32 29.75,-19.7 27.008,-62.55 31.027,-94.92 4.723,-38.06 8.247,-76.27 11.004,-114.53 5.434,-75.29 7.93,-150.8 8.532,-226.29 0.574,-72.24 -4.137,-143.8 -9.141,-215.82 -0.34,-4.9 -0.676,-9.88 0.297,-14.7 1.887,-9.29 8.43,-17.03 11.125,-26.13 5.496,-18.54 -6.012,-37.87 -19.52,-51.73 -57.355,-58.85 -159.183,-47.31 -233.832,-46.41 -72.73,0.87 -145.351,14.3 -213.75,39.92 -25.195,9.43 -76.218,22.82 -93.425,45.22 -17.594,22.9 22.671,77.83 23.375,105.68 4.324,171.4 8.324,341.74 12.644,513.14 0.84,33.27 -25.156,67.31 -2.043,90.49"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path134"
                ></path>
                <path
                  d="m 199.426,1928.11 c 7.676,-1.92 11.082,-10.82 12.453,-18.61 4.32,-24.45 0.484,-49.52 -3.348,-74.06 -1.301,-8.27 -2.593,-16.55 -3.886,-24.83 -0.68,-4.34 -1.36,-8.77 -0.629,-13.11 0.675,-4.06 2.554,-7.8 4.238,-11.56 3.894,-8.71 6.875,-17.88 11.742,-26.09 4.867,-8.21 12.067,-15.59 21.289,-18.04 1.348,-0.36 2.754,-0.62 3.949,-1.33 1.567,-0.94 2.594,-2.54 3.618,-4.04 2.652,-3.88 7.199,-7.91 11.468,-5.95 1.649,9.38 -0.703,18.93 -1.757,28.4 -2.004,18.03 0.792,36.59 8.035,53.23 0.48,1.1 1.035,2.25 2.058,2.88 3.063,1.87 6.203,-2.3 7.395,-5.69 1.488,-4.22 2.976,-8.45 4.469,-12.67 0.929,-2.65 2.543,-5.79 5.343,-5.73 3.125,0.06 4.45,3.94 4.922,7.04 0.781,5.08 1.563,10.16 2.344,15.24 1.805,11.7 3.59,23.75 0.851,35.28 -1.968,8.29 -6.199,15.87 -10.734,23.07 -4.613,7.34 -9.598,14.42 -14.941,21.23 -3.164,4.04 -6.629,8.5 -6.379,13.62"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path136"
                ></path>
                <path
                  d="m 1194.34,2167.15 c 6.53,-2.79 35.6,-24.1 42.05,-26.27 5.67,-1.92 23.16,0.77 36.32,0.16 4.85,-0.23 21.76,-6.35 28.11,-9.27 2.32,-1.08 9.94,-4.37 12.15,-5.67 2.29,-1.34 4.43,-2.93 6.57,-4.5 4.75,-3.5 9.49,-7.01 14.24,-10.52 1.23,-0.9 2.55,-1.93 2.94,-3.41 0.43,-1.6 -0.39,-3.33 -1.68,-4.37 -1.29,-1.02 -2.97,-1.44 -4.61,-1.62 -7.85,-0.8 -26.54,8.07 -26.53,7.11 0.01,-0.85 16.25,-14.4 22.79,-21.31 4.58,-4.85 21.66,-35.43 18.79,-42.68 -2.84,-7.19 -12.67,-8.2 -19.04,-6.43 -10.15,2.82 -30.06,22.53 -30.06,22.53 0,0 -11.31,3.39 -23.25,4.81 -6.36,0.77 -12.97,0.85 -18.79,3.54 -12.4,5.72 -16.94,20.89 -26.56,30.59 -7.23,7.29 -16.92,11.05 -26.14,15.1 -10.05,4.42 -26.59,11.02 -26.59,11.02"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path138"
                ></path>
                <path
                  d="m 1252.4,2107.92 c 7.87,-3.1 16.11,-5.08 24.52,-5.92 4.22,-0.42 8.42,-0.52 12.65,-0.25 3.83,0.24 8.5,0.29 11.91,2.17 1.27,0.69 0.53,2.32 -0.66,2.47 -3.9,0.48 -8.19,-0.74 -12.12,-0.95 -3.91,-0.21 -7.86,-0.23 -11.78,-0.01 -8.15,0.46 -16.18,2.09 -23.9,4.75 -1.45,0.48 -2,-1.72 -0.62,-2.26"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path140"
                ></path>
                <path
                  d="m 358.523,2609.3 c -71.804,-160.82 -123.921,-278.71 -173.578,-370.52 -2.367,-12.42 53.453,-250.68 85.129,-328.76 0,0 -6.074,-18.88 -27.023,-18.88 -20.946,0 -32.637,2.98 -32.637,2.98 0,0 -185.3124,239 -180.5038,371.95 6.9062,190.69 118.9338,405.64 145.5818,439.04 52.824,66.18 174.758,73.85 250.27,95.43"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path142"
                ></path>
                <path
                  d="m 528.715,2806.1 c 37.398,-3.35 162.394,-22.63 193.973,-34.36 53.906,-20.01 109.539,-209.96 158.296,-301.8 58.032,69.01 221.266,211.92 221.266,211.92 l 38.2,-40.27 c 0,0 -208.38,-365.6 -274.161,-357.09 -65.781,8.51 -184.918,208.44 -229.805,265.78"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path144"
                ></path>
                <path
                  d="m 425.414,2933.54 c -8.809,-47.72 -15.836,-95.78 -21.051,-144.03 -1.496,-14.09 34.09,-25.88 44.004,-29.63 37.742,-14.26 87.082,-12.11 111.336,25.12 9.727,14.93 0.57,31.9 -3.375,48.39 -5.566,23.3 -10.976,46.64 -16.601,69.93"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path146"
                ></path>
                <path
                  d="m 582.031,3068.32 c 19.762,-6.66 33.559,-25.35 39.782,-45.26 6.218,-19.9 6.042,-41.16 5.808,-62.02 -0.058,-5.46 -0.141,-11.03 -1.918,-16.19 -2.738,-7.94 -16.683,-28.98 -24.89,-30.71 -8.215,-1.74 -10.375,16.07 -15.504,22.7 -2.844,3.67 -4.426,8.14 -5.957,12.52 -5.387,15.38 -10.774,30.76 -16.161,46.14"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path148"
                ></path>
                <path
                  d="m 607.34,2932.04 c -3.047,28.24 0.797,56.87 -4.426,85.03 -6.316,34.08 -24.75,61.46 -58.617,72.14 -36.238,11.44 -78.891,4.29 -110.18,-16.98 -50.594,-34.39 -56.445,-108.55 -24.664,-160.83 31.781,-52.27 52.832,-71.39 69.641,-77.93 30.043,-11.69 106.14,-2.72 118.152,14.25 11.074,15.65 11.723,69.22 10.094,84.32"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path150"
                ></path>
                <path
                  d="m 361.5,3002.41 c 3.41,14.62 9.867,27.75 10.629,42.89 -4.348,42.39 24.891,66.96 33.406,72.41 31.051,19.9 70.551,21.41 107.063,16.19 20.234,-2.89 39.879,-9.13 58.632,-17.15 30.032,-12.85 58.606,-49.55 25.442,-77.6 -5.438,-4.6 -12.461,-6.79 -19.363,-8.48 -32.637,-8.02 -65.532,-5.79 -98.7,-8 -8.027,-0.54 -23.437,-1.62 -29.796,-7.06 -7.997,-6.85 -5.575,-26.05 -3.965,-34.96 2.261,-12.5 7.07,-24.4 11.57,-36.22 1.375,-3.62 6.148,-13.46 -0.789,-14.37 -2.984,-0.38 -15.801,14.79 -18.852,19.73 -2.422,3.92 -6.187,6.51 -10.66,7.64 -1.625,-13.73 4.215,-25.74 3.254,-39.19 -0.758,-10.49 -0.637,-21.16 -1.992,-31.6 -17.027,2.21 -19.641,3 -30.16,8.62 -10.524,5.63 -28.071,22.13 -31.164,33.65 -6.68,24.86 -10.559,47.79 -4.555,73.5"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path152"
                ></path>
                <path
                  d="m 582.387,2985.42 c -4.422,4.71 -9.907,4.96 -12.657,-6.49 -1.726,-7.21 -0.335,-20.55 9.395,-20.61 14.879,-0.09 10.48,19.43 3.262,27.1"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path154"
                ></path>
                <path
                  d="m 584.398,2979.4 c -1.96,2.08 -4.394,2.2 -5.613,-2.88 -0.765,-3.2 -0.152,-9.11 4.164,-9.14 6.598,-0.04 4.649,8.62 1.449,12.02"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path156"
                ></path>
                <path
                  d="m 493.395,2970.91 c -4.903,4.94 -11.032,5.15 -14.215,-7 -2.008,-7.65 -0.582,-21.76 10.3,-21.73 16.633,0.05 11.907,20.68 3.915,28.73"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path158"
                ></path>
                <path
                  d="m 495.582,2964.56 c -2.18,2.19 -4.894,2.28 -6.305,-3.11 -0.886,-3.39 -0.257,-9.65 4.567,-9.63 7.379,0.02 5.277,9.16 1.738,12.74"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path160"
                ></path>
                <path
                  d="m 459.516,2997.85 c 5.019,0.58 10.125,0.6 15.132,-0.08 2.457,-0.33 4.864,-0.87 7.266,-1.46 2.133,-0.52 5.547,-2.26 7.578,-0.97 l 0.914,2.24 c -0.941,2.58 -4.488,3.03 -6.883,3.57 -2.718,0.63 -5.515,0.99 -8.296,1.21 -5.422,0.44 -10.856,0.11 -16.207,-0.83 -2.051,-0.36 -1.602,-3.92 0.496,-3.68"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path162"
                ></path>
                <path
                  d="m 586.43,3028.9 c -4.953,1.94 -10.434,0.44 -14.535,-2.69 -2.188,-1.68 -4.102,-3.67 -5.719,-5.9 -0.742,-1.03 -1.395,-2.2 -1.946,-3.35 l -0.476,-2.06 -0.508,-1.98 c -0.453,-1.77 1.688,-2.95 3,-1.74 l 1.258,1.15 1.285,0.9 2.035,2.61 c 1.516,1.89 2.446,3.38 4.289,5.08 1.266,1.17 2.992,2.26 4.692,3 1.574,0.69 3.679,1.18 5.504,0.92 2.675,-0.38 3.679,3.06 1.121,4.06"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path164"
                ></path>
                <path
                  d="m 527.465,2892.82 -0.207,1.2 c 15.75,3.25 31.504,6.49 47.254,9.73 l 1.328,-0.22 0.14,-0.87 c -0.222,-3.1 -0.453,-6.2 -0.683,-9.3 -0.258,-3.53 -0.547,-7.17 -2.098,-10.36 -1.379,-2.82 -3.672,-5.11 -6.242,-6.93 -7.113,-5.01 -16.59,-6.48 -24.922,-3.93 -3.472,1.07 -6.816,2.85 -9.187,5.6 -2.375,2.76 -6.407,12.74 -5.59,16.28"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path166"
                ></path>
                <path
                  d="m 554.543,2950.77 c 3.16,-3.99 6.082,-8.18 8.719,-12.53 2.519,-4.37 5.437,-9.19 4.277,-15.86 -0.449,-1.66 -1.543,-3.32 -3.023,-4.39 -1.426,-0.98 -3.231,-1.49 -4.36,-1.7 -2.551,-0.48 -5.105,-0.92 -7.691,-1.07 -5.152,-0.42 -10.352,-0.01 -15.336,1.19 5.074,0.74 9.965,1.64 14.773,2.67 2.395,0.59 4.793,1.09 7.125,1.81 2.438,0.63 3.278,1.25 3.703,2.81 0.817,3.4 -1.046,8.42 -2.957,12.83 -2.007,4.57 -3.75,9.3 -5.23,14.24"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path168"
                ></path>
                <path
                  d="m 436.777,2949.79 c -3.203,2.93 -6.484,5.93 -10.461,7.69 -3.972,1.77 -8.839,2.12 -12.539,-0.18 -2.996,-1.86 -4.797,-5.14 -6.136,-8.41 -3.993,-9.77 -4.95,-20.99 -1.403,-30.93 3.551,-9.94 11.926,-18.33 22.215,-20.7 10.285,-2.38 22.098,2 27.406,11.12"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path170"
                ></path>
                <path
                  d="m 409.633,2833.52 c 30.051,-25.09 82.187,-62.19 119.777,-73.13 -20.394,-9.34 -35.555,-42.52 -36.406,-61.99 -36.207,21.33 -74.344,59.83 -96.395,95.59"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path172"
                ></path>
                <path
                  d="m 558.688,2824.92 c -2.493,-20.65 -15.434,-49 -29.278,-64.53 26.625,-0.68 41.02,-37.87 38.078,-41.83 0,0 13.293,46.23 4.875,88.5"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path174"
                ></path>
                <path
                  d="m 536.582,2738.15 c 8.379,-140.98 17.441,-281.92 24.07,-422.99 3.188,-67.72 5.743,-135.48 6.621,-203.27 0.657,-50.23 8.618,-119.27 -20.449,-163.06 -1.047,-1.58 1.399,-2.88 2.496,-1.46 28.274,36.86 23.035,98.41 22.672,142.07 -0.582,69.6 -3.199,139.18 -6.484,208.7 -6.938,146.81 -17.965,293.38 -27.832,440.01 h -1.094"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path176"
                ></path>
                <path
                  d="m 528.715,2565.06 c 6.976,0 6.988,10.84 0,10.84 -6.977,0 -6.985,-10.84 0,-10.84"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path178"
                ></path>
                <path
                  d="m 535.172,2428.72 c 6.976,0 6.984,10.84 0,10.84 -6.981,0 -6.988,-10.84 0,-10.84"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path180"
                ></path>
                <path
                  d="m 541.621,2292.37 c 6.977,0 6.988,10.85 0,10.85 -6.976,0 -6.988,-10.85 0,-10.85"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path182"
                ></path>
                <path
                  d="m 548.07,2156.04 c 6.981,0 6.993,10.83 0,10.83 -6.972,0 -6.984,-10.83 0,-10.83"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path184"
                ></path>
                <path
                  d="m 548.07,2019.69 c 6.981,0 6.993,10.85 0,10.85 -6.972,0 -6.984,-10.85 0,-10.85"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path186"
                ></path>
                <path
                  d="m 522.266,2701.4 c 6.976,0 6.988,10.84 0,10.84 -6.977,0 -6.989,-10.84 0,-10.84"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path188"
                ></path>
                <path
                  d="m 347.34,2570.76 c -2.274,-12.87 -7.61,-25.36 -12.594,-37.37 -7.676,-18.5 -16.266,-36.64 -25.051,-54.63 -20.707,-42.4 -42.961,-84.05 -65.507,-125.5 -17.516,-32.22 -35.204,-64.34 -52.825,-96.5 -2.129,-3.88 -4.258,-7.76 -6.297,-11.68 -0.867,-1.68 -2.234,-3.68 -2.582,-5.57 -0.589,-3.17 0.918,-7.44 1.481,-10.54 1.527,-8.42 3.18,-16.84 4.851,-25.25 5.508,-27.68 11.61,-55.23 17.981,-82.72 7.926,-34.16 15.906,-68.45 26.234,-101.97 2.512,-8.15 5.051,-16.3 7.824,-24.37 0.649,-1.89 3.5,-1.13 3.012,0.83 -15.855,63.9 -32.359,127.56 -46.035,191.99 -3.492,16.47 -7.195,32.92 -10.062,49.5 l -0.247,1.51 -0.074,-0.18 c 0.27,0.83 0.039,0.24 0.664,1.53 1.559,3.24 3.239,6.41 4.918,9.57 15.93,30.07 32.707,59.69 48.907,89.61 22.414,41.41 44.378,83.1 65.078,125.4 9.144,18.7 18.101,37.51 26.16,56.7 5.707,13.59 11.371,27.42 14.789,41.8 0.57,2.41 1.062,4.83 1.406,7.28 0.184,1.31 -1.793,1.91 -2.031,0.56"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path190"
                ></path>
                <path
                  d="m 437.094,2880.48 c 12.422,-18.69 27.601,-36.84 48.789,-45.7 10.355,-4.34 21.496,-6.4 32.668,-7 11.715,-0.63 25.328,-0.95 36.488,3.12 1.785,0.66 1.477,3.15 -0.449,3.3 -11.121,0.86 -22.399,-1.39 -33.59,-0.99 -11.258,0.41 -22.594,2.17 -33.113,6.32 -20.93,8.25 -34.582,26.03 -48.949,42.37 -0.875,1 -2.575,-0.3 -1.844,-1.42"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path192"
                ></path>
                <path
                  d="m 1163.57,2741.26 c 5.05,1.27 10.22,2.39 15.36,3.22 5.07,0.83 10.94,2.13 16.07,1.78 l 4.46,-1.14 -2.01,-1.75 c -2.1,-1.45 -4.41,-2.61 -6.69,-3.76 -4.01,-2.02 -8.88,-3.54 -12.47,-6.28 -2.14,-1.63 -2.86,-4.49 -3.08,-7.05 -0.42,-5.06 0.37,-10.25 0.13,-15.34 -0.54,-11.21 -3.31,-22.32 -12.08,-29.94 -1.92,-1.67 0.63,-5.04 2.74,-3.56 8.4,5.91 12.39,15.53 13.71,25.48 0.81,6.04 0.38,12.23 -0.24,18.28 -0.37,3.71 -1.35,8.09 2.37,10.18 5.2,2.94 10.76,5.22 15.8,8.45 2.91,1.86 7.8,6.07 2.09,7.95 -5.53,1.82 -11.47,0.3 -17.04,-0.52 -6.77,-1 -13.08,-2.73 -19.33,-5.5 l 0.21,-0.5"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path194"
                ></path>
                <path
                  d="m 4166.23,629.648 -13.17,704.592 h 46.87 l -13.18,-704.592 c -0.16,-7.148 -4.75,-12.937 -10.26,-12.937 -5.51,0 -10.1,5.789 -10.26,12.937"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path196"
                ></path>
                <path
                  d="m 4550.21,657.09 -272.23,650.01 43.56,17.29 247.73,-659.73 c 2.49,-6.699 0.36,-13.781 -4.76,-15.808 -5.13,-2.032 -11.53,1.66 -14.3,8.238"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path198"
                ></path>
                <path
                  d="m 3802.77,657.09 272.23,650.01 -43.56,17.29 -247.73,-659.73 c -2.49,-6.699 -0.36,-13.781 4.76,-15.808 5.12,-2.032 11.53,1.66 14.3,8.238"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path200"
                ></path>
                <path
                  d="m 3994.04,1530.23 c -14.71,197.23 0.38,398.57 57.42,588.75 46.77,155.94 211.19,194.9 347.35,113.83 131.11,-78.05 204.9,-231.16 246.76,-370.42 40.29,-134.05 66.53,-288.32 27.78,-425.78 -42.09,-149.32 -185.25,-203.6 -326.49,-217.84 -186.03,-18.75 -377.93,-12.3 -559.84,33.32 -56.56,14.19 -117.1,62.26 -49.95,112.39 55.52,41.46 144.08,57.04 212.37,58.14"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path202"
                ></path>
                <path
                  d="m 3856.62,671.789 c -8,-16.168 -24.45,-24.82 -39.36,-33.418 -14.91,-8.609 -30.72,-20.262 -34.59,-37.949 15.45,-8.281 33.7,-9.57 51.22,-6.992 17.51,2.57 34.54,8.781 51.43,14.961 6.98,2.558 14.31,5.347 19.36,11.308 6.18,7.293 7.6,17.75 7.97,27.442 0.75,19.441 -8.44,35.257 -8.44,35.257"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path204"
                ></path>
                <path
                  d="m 4473.13,1540.55 c 9.06,-29.51 16.25,-59.57 21.56,-89.96 10.44,-59.93 -8.99,-122.31 -62.07,-156.64 -29.13,-18.84 -63.34,-28.15 -97.34,-35.06 -62.08,-12.62 -124.34,12.66 -186.85,14.4 -68.46,1.91 -136.54,2.9 -204.85,9.17 -31.59,2.9 -63.36,8.38 -94.94,9.9 -25.92,1.26 -51.43,7.17 -70.85,26.24 -32.47,31.9 -34.21,88 -33.37,130.56 0.1,4.8 0.71,9.8 3.44,13.74 2.86,4.12 9.55,17.19 14.1,19.3 109.49,50.77 226.68,69.84 347.16,76.67"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path206"
                ></path>
                <path
                  d="m 3923.73,1262.66 c -4.42,48.05 -10.96,97.05 -31.44,139.74 -20.47,42.71 -57.51,78.54 -101.13,82.99 -14.6,1.49 -30.12,-0.82 -42.02,-10.25 -11.06,-8.77 -17.81,-22.63 -23.22,-36.43 -47.82,-122.06 -16.89,-262.26 14.66,-390.6 29.4,-119.622 85.54,-257.239 114.95,-376.86 l 48.68,11.148 c 26.08,191.922 37.28,387.192 19.52,580.262"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path208"
                ></path>
                <path
                  d="m 4516.36,1762.07 c -10.18,-49.98 -20.35,-99.96 -30.52,-149.94 -3.71,-18.2 -7.41,-37.05 -3.44,-55.2 0.82,-3.72 1.92,-7.78 0.21,-11.19 -1.28,-2.56 -3.88,-4.15 -6.41,-5.48 -19.35,-10.14 -41.71,-12.55 -63.48,-14.51 -112.31,-10.08 -225.3,-12.67 -337.96,-7.77 -26.63,1.16 -54.29,3.04 -77.58,15.99 -6.64,3.7 -13.36,12.52 -7.95,17.86 2.25,2.22 5.73,2.54 8.51,4.06 6.93,3.77 7.57,13.29 7.34,21.17 -1.76,59.65 -3.52,119.45 -11.95,178.54 -8.63,60.51 -24.23,120.29 -25.93,181.39 -0.73,25.91 1.06,51.93 -1.69,77.7 -2.72,25.35 -9.78,50 -16.82,74.51 -1.39,4.82 -2.77,9.65 -4.16,14.48"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path210"
                ></path>
                <path
                  d="m 4073.5,646.719 c -7.99,-16.168 -24.46,-24.821 -39.36,-33.418 -14.9,-8.61 -30.72,-20.262 -34.59,-37.949 15.45,-8.282 33.7,-9.563 51.21,-6.993 17.52,2.571 34.55,8.789 51.45,14.961 6.98,2.559 14.3,5.352 19.35,11.309 6.18,7.293 7.6,17.75 7.97,27.441 0.75,19.442 -1.48,38.871 -6.6,57.2"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path212"
                ></path>
                <path
                  d="m 4240.85,1218.89 c 3.74,47.98 5.54,97.19 -7.53,142.29 -13.07,45.1 -43.68,85.91 -86.1,96.8 -14.2,3.64 -29.95,3.67 -43.33,-3.84 -12.44,-6.98 -21.46,-19.62 -29.14,-32.4 -67.96,-113.06 -60.99,-255.73 -51.43,-386.81 8.92,-122.16 41.27,-266.039 50.18,-388.211 l 55.38,-0.129 c 58.22,185.09 96.98,379.54 111.97,572.3"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path214"
                ></path>
                <path
                  d="m 4203.52,1662.97 c -63.09,0.71 -187.2,-1.16 -250.13,2.24 -109.24,5.91 -86.29,118.75 -89.02,204.33 -2.15,67.07 1.67,134.24 7.7,201.02 3.11,34.38 6.86,68.71 10.95,102.99 3.68,30.89 5.98,65.58 24.71,91.76 23.17,32.39 64.14,46.55 101.39,54.87 46.76,10.44 93.13,22.55 139.86,33.16 l 176.78,-2.06 c 67.92,-21.76 124.97,-45.16 192.89,-66.92 17.71,-5.68 35.98,-11.67 49.82,-24.11 49.82,-44.77 40.55,-126.31 37.12,-186.09 -1.76,-30.62 -8.17,-60.77 -14.55,-90.78 -18.06,-84.84 -38.09,-165.91 -78.36,-243.53 -8.07,-15.55 -16.93,-31.12 -29.97,-42.82 -19.84,-17.78 -47.46,-24.74 -74.1,-24.89"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path216"
                ></path>
                <path
                  d="m 4302.06,2498.33 c 9.19,-49.81 16.52,-99.99 21.96,-150.36 -23.4,-17.35 -53.84,-23.3 -82.9,-21.1 -29.04,2.21 -77.03,10.22 -85.49,27.76 4.76,16.78 18.06,74.76 27.09,112.15"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path218"
                ></path>
                <path
                  d="m 4091.7,2612.95 c -9.11,-6.13 -22.72,-12.86 -26.3,-23.93 -1.86,-5.72 -1.8,-11.86 -1.54,-17.87 1.51,-35.12 9.48,-69.96 23.38,-102.25 2.26,-5.26 4.95,-10.75 9.84,-13.69 6.48,-3.9 14.74,-2.19 22.08,-0.37 6.06,1.52 12.13,3.02 18.18,4.53 4.35,1.09 9.1,2.45 11.53,6.2"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path220"
                ></path>
                <path
                  d="m 4103.72,2468.74 c -4.71,29.29 -16.45,57.06 -18.94,86.84 -3.02,36.07 8,68.71 39.17,88.79 33.34,21.5 78.27,26.03 115.63,13.21 60.41,-20.71 86.79,-93.88 69.16,-155.28 -11.01,-38.36 -36.54,-72.2 -58.66,-88.1 -18.31,-13.16 -54.84,-13.52 -78.74,-12.07 -19.47,1.17 -34.42,1.17 -46.66,16.36 -9.94,12.34 -18.45,34.6 -20.96,50.25"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path222"
                ></path>
                <path
                  d="m 4295.39,2517.28 c -1.47,-18.2 3.26,-38 6.06,-56 0.23,-1.54 0.54,-3.21 1.68,-4.29 1.7,-1.61 4.42,-1.22 6.71,-0.71 7.55,1.65 15.1,3.3 22.65,4.95 2.54,0.56 5.16,1.14 7.3,2.62 4.11,2.83 5.55,8.34 5.28,13.32 -0.28,4.99 -1.95,9.78 -2.73,14.72 -2.35,15.08 3.74,29.99 7.89,44.68 10.06,35.52 8.92,74.12 -3.21,108.98 -2.3,6.63 -5.35,13.55 -11.32,17.23 -2.34,1.44 -5.05,2.32 -7.13,4.13 -2.57,2.25 -3.83,5.6 -5.09,8.78 -8.29,20.8 -22.58,40.98 -43.83,48.04 -13.17,4.37 -27.5,3.2 -41.21,1.08 -37.68,-5.84 -74.25,-18.53 -112.26,-21.55 -21.09,-1.68 -45.65,1.39 -57.33,19.03 -5.86,-10 -7.12,-22.58 -3.37,-33.55 -5.29,2.86 -10.6,5.72 -15.9,8.58 0.45,-9.32 2.86,-18.54 7.04,-26.88 -3.05,2.66 -7,4.27 -11.03,4.5 -3.16,0.18 -2.34,-55.33 -1.15,-59.84 9.64,-36.31 66.8,-28.52 93.15,-21.91 6.34,1.6 12.79,3.42 19.3,2.8 6.94,-0.65 13.29,-4 19.79,-6.5 12.05,-4.63 25.18,-6.35 38.02,-5.14 7.02,0.66 13.38,2.76 20.16,4.37 3.03,0.71 11.44,4.05 14,2.86 3.32,-1.54 4.18,-20.23 5.1,-24.28 1.08,-4.78 0.93,-13.34 6.36,-15.54 2.97,-1.19 6.28,0.24 9.14,1.64 2.26,1.11 4.56,2.24 6.27,4.08 1.53,1.64 2.5,3.76 4.17,5.24 1.68,1.48 4.56,2.07 6.02,0.36 l 0.96,-2.06 c 3.78,-12.4 6.32,-25.19 7.54,-38.1"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path224"
                ></path>
                <path
                  d="m 4269.42,2546.15 c 2.42,3.85 4.9,7.76 8.42,10.63 3.52,2.88 8.31,4.57 12.67,3.28 3.53,-1.05 6.25,-3.86 8.49,-6.79 6.72,-8.73 10.78,-19.77 9.94,-30.77 -0.84,-10.98 -6.98,-21.73 -16.67,-26.95 -9.71,-5.22 -22.82,-4.07 -30.67,3.66"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path226"
                ></path>
                <path
                  d="m 4449.89,2165.14 c -22.73,-111.29 -45.48,-222.58 -68.22,-333.87 l -41.46,54.17 109.68,279.7"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path228"
                ></path>
                <path
                  d="m 4030.7,1856.76 c 15.81,11.45 202.57,68.74 230.66,75.98 -30.79,-7.14 -49.31,-7.42 -80.49,-12.59 -36.19,-6.01 -86.06,-19.56 -118.35,-34.04 -0.09,79.96 -9.56,276.68 -19.05,292.09 -0.08,-37.69 2.84,-131.36 1.88,-158.44 -1.92,-54.55 -6.57,-109.01 -14.65,-163"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path230"
                ></path>
                <path
                  d="m 4245.18,2325.72 c 2.74,-51.87 5.96,-107.08 -0.24,-158.72 -0.42,-3.45 -5.19,-3.57 -5.46,0 -3.88,52.14 -0.16,106.44 1.1,158.72 0.06,2.98 4.44,2.95 4.6,0"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path232"
                ></path>
                <path
                  d="m 4325.76,2351.28 c -15.4,-26.7 -50.23,-27.88 -77.65,-28.58 -34,-0.86 -67.97,1.33 -92.88,27.06 -4.19,4.32 2.41,10.94 6.63,6.61 22.07,-22.69 52.11,-25.09 82.05,-24.77 29.31,0.32 55.61,1.79 78.61,22.19 1.71,1.51 4.46,-0.4 3.24,-2.51"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path234"
                ></path>
                <path
                  d="m 4225.44,2287.07 c -0.19,-1.95 -0.43,-3.5 -2.03,-4.77 -1.79,-1.41 -3.66,-1.42 -5.46,0 -1.63,1.29 -1.85,2.83 -2.03,4.77 -0.57,6.12 10.1,6.13 9.52,0"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path236"
                ></path>
                <path
                  d="m 4224.23,2240.27 0.12,-2.03 c 0.27,-4.72 -7.61,-4.72 -7.34,0 l 0.12,2.03 c 0.26,4.56 6.83,4.57 7.1,0"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path238"
                ></path>
                <path
                  d="m 4227.37,2192.73 c 1.16,-5.2 -5.97,-8.61 -8.83,-3.73 -3.63,6.21 7.33,10.56 8.83,3.73"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path240"
                ></path>
                <path
                  d="m 4116.04,2537.81 c 3.03,5.73 8.28,7.42 13.97,-2.94 3.57,-6.52 5.76,-19.8 -3.64,-22.43 -14.38,-4.02 -15.29,16.04 -10.33,25.37"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path242"
                ></path>
                <path
                  d="m 4115.68,2531.45 c 1.35,2.54 3.68,3.29 6.2,-1.3 1.59,-2.89 2.55,-8.78 -1.62,-9.95 -6.37,-1.78 -6.77,7.11 -4.58,11.25"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path244"
                ></path>
                <path
                  d="m 4208.87,2540.5 c 3.43,6.08 9.31,7.9 15.61,-3.01 3.97,-6.88 6.32,-20.92 -4.23,-23.77 -16.11,-4.35 -16.99,16.87 -11.38,26.78"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path246"
                ></path>
                <path
                  d="m 4208.44,2533.77 c 1.52,2.69 4.13,3.51 6.92,-1.34 1.76,-3.05 2.8,-9.27 -1.87,-10.54 -7.15,-1.92 -7.54,7.48 -5.05,11.88"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path248"
                ></path>
                <path
                  d="m 4231.07,2571.63 c -5.06,-0.77 -10.05,-2.12 -14.77,-4.14 -2.31,-0.99 -4.52,-2.16 -6.72,-3.39 -1.1,-0.62 -2.16,-1.32 -3.26,-1.95 -1.38,-0.78 -2.54,-1.4 -4.08,-0.68 l -0.99,1.72 c -0.17,2.65 4.01,4.37 5.98,5.41 2.42,1.28 4.98,2.34 7.56,3.27 5.08,1.83 10.4,2.94 15.79,3.44 2.08,0.19 2.58,-3.36 0.49,-3.68"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path250"
                ></path>
                <path
                  d="m 4102.35,2570.25 c 4.2,3.11 9.85,3.21 14.57,1.31 2.62,-1.05 5.04,-2.47 7.24,-4.25 0.97,-0.77 1.86,-1.69 2.69,-2.61 0.96,-1.05 1.45,-2.54 2.16,-3.8 0.91,-1.6 -0.88,-3.27 -2.46,-2.45 l -1.44,0.74 -1.57,0.55 c -0.92,0.53 -1.77,1.37 -2.63,2 -1.87,1.36 -3.58,2.81 -5.66,3.87 -3.04,1.56 -7.44,2.44 -10.77,1.01 -2.49,-1.08 -4.32,2 -2.13,3.63"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path252"
                ></path>
                <path
                  d="m 4193.7,2462.71 -0.12,1.22 c -16.1,-1.03 -32.21,-2.06 -48.32,-3.09 l -1.22,-0.57 0.09,-0.88 c 1.05,-2.93 2.08,-5.87 3.13,-8.81 1.18,-3.35 2.42,-6.8 4.77,-9.48 2.07,-2.37 4.9,-3.98 7.87,-5.06 8.22,-2.96 17.78,-1.87 25.16,2.8 3.08,1.95 5.85,4.55 7.42,7.85 1.56,3.29 2.83,14.01 1.1,17.24"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path254"
                ></path>
                <path
                  d="m 4152.16,2511.64 c -2,-4.7 -3.72,-9.54 -5.12,-14.44 -1.28,-4.9 -2.83,-10.33 0.05,-16.48 0.88,-1.48 2.37,-2.8 4.08,-3.43 1.65,-0.59 3.53,-0.6 4.68,-0.5 2.59,0.2 5.19,0.46 7.72,0.99 5.1,0.96 10.02,2.73 14.54,5.21 -5.11,-0.64 -10.08,-1.07 -15.01,-1.34 -2.47,-0.06 -4.93,-0.21 -7.38,-0.14 -2.53,-0.03 -3.5,0.36 -4.33,1.75 -1.69,3.09 -1.22,8.43 -0.54,13.21 0.74,4.96 1.17,9.99 1.31,15.17"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path256"
                ></path>
                <path
                  d="m 4281.09,2299 c -4.7,5.55 -8.52,11.85 -11.28,18.58 -1.18,2.89 -2.23,5.97 -4.51,8.1 -3.65,3.43 -9.23,3.42 -14.23,3.23 -24.11,-0.91 -43.54,-0.44 -65.6,9.33 -1.02,0.45 -6.77,5.61 -10.57,1.97 -1.2,-1.15 -1.74,-5.56 -1.22,-7.14 2.02,-6.22 14.55,-33.53 20.56,-36.14 3.55,-1.55 6.98,1.36 8.69,4.84 -0.63,-4.16 7.62,-16.47 14.87,-18.38 3.07,-0.81 8.04,0.59 11.1,1.44 l 1.62,0.26 c 1.08,-0.2 1.61,-1.4 2,-2.42 3.25,-8.58 9.68,-15.9 17.75,-20.25"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path258"
                ></path>
                <path
                  d="m 4471.7,1871.89 c 4.57,8.21 -17.97,97.4 -30.53,141.26 -17.02,59.44 -159.42,292.47 -159.42,292.47 l -59.09,-34.04 c 0,0 -2.58,-213.5 35.76,-388.46 23.46,-107.06 55.44,-199.68 132.61,-220.15 58.09,-15.41 114.21,44.5 114.21,44.5 l 6.2,30.42"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path260"
                ></path>
                <path
                  d="m 4278.69,2286.47 c -5.86,26.91 -14.82,52.95 -26.63,77.37 -2.1,4.35 -4.32,8.68 -7.18,12.5 -6.77,9.01 -16.69,14.54 -26.32,19.82 -2.96,1.63 -6.02,3.28 -9.35,3.72 -3.1,0.4 -6.24,-0.27 -9.32,-0.94 -10.85,-2.38 -31.63,-9.76 -30.92,-12.24 1.58,-5.44 5.05,-5.08 7.14,-5.18 8.81,-0.41 16.12,1.4 24.92,0.99 -4.43,-1.03 -9.22,-2.28 -12.11,-6.06 -2.89,-3.8 -2.05,-10.87 2.36,-11.73 -3.35,1.61 -7.72,0.44 -10.07,-2.69 -2.35,-3.13 -2.48,-7.94 -0.28,-11.08 1.05,-1.51 2.67,-3.06 2.2,-4.91 -0.37,-1.4 -1.76,-2.13 -2.85,-3 -4.68,-3.78 -3.6,-10.29 -0.99,-14.88 3.16,-5.55 6.33,-11.11 9.49,-16.67 1.11,-1.97 2.04,-5.12 4.21,-5.12 7.05,0 2.1,13.38 2.1,13.38 0,0 10.08,-13.85 15.12,-20.78 3.53,-4.84 7.54,-12.36 14.76,-10.13 1.82,0.55 3.52,2.21 5.32,1.72 1.25,-0.34 2.04,-1.6 2.71,-2.78 4.14,-7.21 8.28,-14.43 12.42,-21.65"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path262"
                ></path>
                <path
                  d="m 4245.39,2375.17 c -7.59,7.84 -16.48,14.53 -26.45,19.02 -4.89,2.19 -9.98,4.12 -15.4,4.05 -2.86,-0.03 -5.69,-0.45 -8.45,-1.13 -2.37,-0.59 -4.9,-1.75 -7.37,-1.63 l -0.66,1.6 c 3.23,3.6 10.55,4.2 15.08,4.42 5.79,0.29 10.98,-1.41 16.24,-3.66 11.05,-4.73 20.83,-11.92 28.55,-21.13 0.89,-1.07 -0.55,-2.58 -1.54,-1.54"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path264"
                ></path>
                <path
                  d="m 4224.13,2369.03 c -3.29,2.41 -6.76,4.56 -10.38,6.42 -1.77,0.91 -3.55,1.75 -5.38,2.5 -0.97,0.4 -1.93,0.77 -2.91,1.13 -0.98,0.35 -1.86,0.55 -2.5,1.4 l 0.65,1.6 c 1.02,0.27 1.95,-0.23 2.88,-0.6 0.91,-0.35 1.81,-0.71 2.71,-1.09 1.91,-0.82 3.8,-1.72 5.64,-2.68 3.67,-1.94 7.16,-4.17 10.47,-6.66 1.19,-0.88 0.05,-2.91 -1.18,-2.02"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path266"
                ></path>
                <path
                  d="m 4198.99,2334.93 c -1.14,0.84 -2.32,1.62 -3.55,2.33 -1.27,0.73 -2.61,1.31 -3.89,2.01 -1.24,0.67 -2.54,1.2 -3.81,1.81 l -1.7,0.79 -1.13,0.44 -0.96,0.71 0.47,1.81 2.29,-0.05 2.24,-0.53 c 1.49,-0.41 2.93,-1.1 4.32,-1.78 2.69,-1.32 5.12,-3.49 7.24,-5.58 0.97,-0.96 -0.34,-2.82 -1.52,-1.96"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path268"
                ></path>
                <path
                  d="m 4207.67,2353.82 c -2.71,2.29 -5.7,4.01 -8.86,5.57 -3.1,1.54 -6.55,2.32 -9.42,4.3 -0.87,0.62 -0.91,2.25 0.33,2.5 3.99,0.81 7.8,-0.93 11.25,-2.8 3.35,-1.83 6.38,-4.5 8.95,-7.31 1.42,-1.53 -0.69,-3.58 -2.25,-2.26"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path270"
                ></path>
                <path
                  d="m 4193.19,2320.12 0.03,-0.02 -0.17,0.13 -0.87,0.84 -0.6,0.92 -1.12,1.9 -1.08,1.91 c -0.42,0.85 -0.89,1.71 -0.77,2.7 l 0.64,1.25 1.38,0.29 0.75,-0.27 0.68,-0.56 0.98,-1.2 1.16,-1.95 1.08,-2.36 0.38,-1.08 0.06,-1.46 -0.91,-1.35 -1.62,0.31"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path272"
                ></path>
                <path
                  d="m 4488.66,1878.58 c -25.52,134.06 -165.63,347.47 -208.41,418.32 -4.34,0.57 -37.94,-10.02 -50.05,-30.17 11.61,-154.22 51.02,-463.19 133.79,-551.03 16.07,-17.04 37.53,-31.8 60.98,-32.78 28.68,-1.19 72.15,31.1 87.71,56.93"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path274"
                ></path>
                <path
                  d="m 4324.99,1288.59 c 44.8,7.88 91.36,19.01 125.25,49.34 15.53,13.9 27.59,31.17 39.51,48.27 1.95,2.8 3.9,5.61 5.86,8.42 -5.91,-40.21 -26.5,-77.07 -62.99,-100.67 -29.13,-18.84 -63.34,-28.15 -97.34,-35.06 -30.52,-6.2 -61.08,-3.24 -91.71,1.58 0.01,30.78 1.51,89.52 -14.41,113.27 30.98,-7.25 25.51,-77.7 56.2,-86.05 12.86,-3.51 26.51,-1.41 39.63,0.9"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path276"
                ></path>
                <path
                  d="m 3879.46,1207.91 c -17.56,57.94 -44,114.12 -48.6,174.48 -0.23,3.06 -0.34,6.36 1.35,8.91 1.88,2.85 5.35,4.49 8.75,4.86 101.51,10.96 183.61,16.34 279.88,71.31 l 35.93,10.16 c -51,-22.16 -90.31,-47.18 -113.8,-97.57 -12.27,-26.31 -16.22,-64.12 -18.03,-102.96 -24.41,1.17 -56.91,3.11 -81.36,5.36 -7.36,0.67 -14.74,1.5 -22.12,2.38 0.83,-7.4 1.59,-14.8 2.27,-22.18 17.76,-193.07 6.56,-388.34 -19.52,-580.262 l -14.61,-3.339 c 3.18,96.613 23.97,222.332 17.36,315.183 -5.47,76.758 -5.18,140.008 -27.5,213.668"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path278"
                ></path>
                <path
                  d="m 4298.17,1845.71 c -88.79,-58.78 -186.1,-125.26 -287.93,-156.44 h 59.2 c 38.91,7.41 180.15,113.83 208.54,135.24 28.4,21.42 20.19,21.2 20.19,21.2"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path280"
                ></path>
                <path
                  d="m 4459.89,1979.37 c 15.28,-2.58 30.25,-6.99 44.49,-13.07 3.91,-1.68 7.83,-3.52 11.06,-6.28 12,-10.27 21.76,-23.58 27.29,-38.42 3.19,-8.5 4.36,-17.96 1.93,-26.71 -0.89,-3.19 -3.24,-6.85 -6.52,-6.29 -0.34,-3.5 0.17,-7.03 0.25,-10.55 0.07,-3.52 -0.35,-7.22 -2.32,-10.14 -1.97,-2.92 -5.83,-4.79 -9.13,-3.54 -0.03,-3.84 -0.35,-7.76 -1.85,-11.29 -1.51,-3.54 -4.35,-6.67 -8.05,-7.7 -2.92,-0.81 -4.04,2.47 -4.35,4.74 -0.47,3.33 -0.94,6.65 -1.41,9.98 1.23,-11.3 -3.13,-23.07 -11.4,-30.85 l -2.25,-1.22 c -1.77,-0.04 -2.6,2.15 -2.82,3.9 -2.25,17.8 -1.41,36.39 -8.7,53.69 -7.59,17.99 -13.66,42.04 -15.26,61.8"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path282"
                ></path>
                <path
                  d="m 4497.92,1911.76 c 5.7,-7.29 10.21,-15.3 13.11,-24.11 1.43,-4.39 2.64,-8.91 3.27,-13.49 0.3,-2.24 0.66,-4.55 0.69,-6.81 0.03,-2.45 -0.31,-4.98 -0.42,-7.44 -0.07,-1.57 -2.29,-1.54 -2.41,0 -0.36,4.46 -1.36,8.97 -2.24,13.36 -0.87,4.3 -1.79,8.57 -3.09,12.77 -2.66,8.46 -6.2,16.68 -10.69,24.35 -0.62,1.07 0.97,2.41 1.78,1.37"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path284"
                ></path>
                <path
                  d="m 4507.42,1926.42 c 7.6,-8.56 13.51,-18.73 16.97,-29.66 1.31,-4.12 2.24,-8.4 3.04,-12.64 0.75,-3.91 1.82,-8.77 0.61,-12.67 -0.48,-1.53 -2.83,-1.66 -3.24,0 -0.92,3.71 -1.31,7.62 -2.03,11.38 -0.78,4.09 -1.72,8.18 -2.9,12.17 -3.12,10.58 -7.84,20.45 -14.81,29.04 -1.34,1.65 0.91,4.02 2.36,2.38"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path286"
                ></path>
                <path
                  d="m 4517.52,1948.01 c 7.6,-8.57 13.51,-18.74 16.97,-29.66 1.31,-4.12 2.23,-8.4 3.04,-12.64 0.75,-3.91 1.82,-8.78 0.6,-12.67 -0.47,-1.54 -2.82,-1.66 -3.24,0 -0.92,3.71 -1.31,7.61 -2.02,11.38 -0.78,4.1 -1.72,8.17 -2.9,12.17 -3.12,10.58 -7.85,20.44 -14.81,29.04 -1.34,1.65 0.9,4.01 2.36,2.38"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path288"
                ></path>
                <path
                  d="m 3703.87,1683.91 h 533.97 l -107.63,307.61 c -3.34,9.58 -12.39,16 -22.53,16 h -492.24 c -12.12,0 -20.61,-11.96 -16.6,-23.4 l 105.03,-300.21"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path290"
                ></path>
                <path
                  d="m 4163.79,1683.91 h 290.6 v 25.55 h -290.6 v -25.55"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path292"
                ></path>
                <path
                  d="m 1287.71,629.648 13.18,704.592 h -46.87 l 13.18,-704.592 c 0.15,-7.148 4.74,-12.937 10.26,-12.937 5.51,0 10.1,5.789 10.25,12.937"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path294"
                ></path>
                <path
                  d="m 903.746,657.09 272.214,650.01 -43.56,17.29 -247.72,-659.73 c -2.496,-6.699 -0.364,-13.781 4.758,-15.808 5.125,-2.032 11.531,1.66 14.308,8.238"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path296"
                ></path>
                <path
                  d="m 1651.17,657.09 -272.22,650.01 43.56,17.29 247.72,-659.73 c 2.49,-6.699 0.37,-13.781 -4.75,-15.808 -5.12,-2.032 -11.53,1.66 -14.31,8.238"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path298"
                ></path>
                <path
                  d="m 1459.9,1530.23 c 14.72,197.23 -0.38,398.57 -57.42,588.75 -46.77,155.94 -211.18,194.9 -347.34,113.83 -131.117,-78.05 -204.906,-231.16 -246.761,-370.42 -40.293,-134.05 -66.531,-288.32 -27.781,-425.78 42.093,-149.32 185.246,-203.6 326.482,-217.84 186.04,-18.75 377.94,-12.29 559.84,33.32 56.58,14.19 117.1,62.26 49.96,112.39 -55.52,41.46 -144.09,57.04 -212.38,58.14"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path300"
                ></path>
                <path
                  d="m 2158.76,768.031 c 7.32,-15.461 1.65,-36.152 13.04,-48.902 8.6,-9.649 23.29,-10.34 36.19,-9.348 32.1,2.461 63.72,10.989 92.7,25.02 8.67,4.199 18.18,10.5 18.71,20.121 0.07,1.269 -0.05,2.629 -0.78,3.668 -1.01,1.469 -2.9,1.98 -4.63,2.379 -39.1,9.133 -78.2,18.261 -117.3,27.39"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path302"
                ></path>
                <path
                  d="m 1625.97,1593.17 c 147.59,-54.99 256.32,-123.65 309.48,-219.54 72.45,-130.68 128.22,-248.98 170.65,-348.01 36.67,-85.569 65.58,-160.979 109.38,-243.132 -8.84,-12.699 -14.54,-21.398 -55.27,-18.199 -151.56,107.43 -319.13,283.551 -370.62,462.041 -6.58,22.82 -13.34,47.71 -32.31,62 -6.52,4.91 -14.08,8.2 -21.57,11.46 -153.34,66.58 -268.78,133.39 -422.12,199.98"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path304"
                ></path>
                <path
                  d="m 2123.25,791.648 c -5.37,7.704 -11.1,15.172 -16.84,22.403 -68.55,86.32 -145.23,166.898 -202.19,261.259 -38.78,64.24 -80.27,174.93 -97.84,212.92 -16.95,36.63 -79.29,108.84 -134.62,152.45 -16.77,13.23 -37.16,31.85 -29.36,51.73 5.05,12.84 19.66,18.41 31.38,25.71 15.36,9.59 27.05,24.51 33.55,41.38 -25.59,11.8 -52.72,23 -81.36,33.67 l -312.38,-93.4 c 153.34,-66.59 268.78,-133.4 422.12,-199.98 7.49,-3.26 15.05,-6.55 21.57,-11.46 18.97,-14.29 25.73,-39.18 32.31,-62 47.33,-164.08 192.76,-326.119 333.66,-434.682"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path306"
                ></path>
                <path
                  d="m 1785.57,680.398 c 7.89,-15.179 2.98,-36.039 14.84,-48.378 8.97,-9.309 23.66,-9.461 36.51,-8 31.99,3.66 63.28,13.371 91.71,28.468 8.5,4.524 17.78,11.172 17.95,20.801 0.02,1.27 -0.15,2.621 -0.92,3.641 -1.06,1.422 -2.97,1.859 -4.71,2.199 -39.42,7.672 -78.83,15.332 -118.24,23"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path308"
                ></path>
                <path
                  d="m 1007.61,1604.23 c -61.579,-129.62 9.61,-250.68 116.3,-298.77 99.55,-44.89 262.94,-30.97 365.69,-66.02 11.47,-3.91 23.15,-8.19 32.37,-16.07 9.61,-8.2 20.19,-38.7 26.09,-49.87 31.95,-148.25 81.84,-292.82 234.92,-495.461 21.67,-8.629 45.3,-3.098 62.67,16.332 -23.23,132.988 -64.6,556.779 -116.98,636.679 -69.48,106 -263.61,238.66 -361.95,248.92"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path310"
                ></path>
                <path
                  d="m 1766.04,714.102 c -55.43,120.859 -127.75,235.418 -160.87,364.198 -17.97,69.86 -28.83,150.67 -87.81,192.23 -32.96,23.23 -74.64,28.87 -113.85,38.21 -66.57,15.85 -130.35,44.31 -185.26,85.13 -8.83,6.56 -18.2,14.87 -18.63,25.87 -0.7,18.41 21.8,30.98 40.22,30.52 62.42,-1.56 116.93,-11.79 146.51,7.83 39.28,26.03 75.08,54.18 149.58,48.32 l -72.29,65.53 c -24.73,10.15 -77.81,6.04 -96.92,8.03 l -359.11,24.27 c -61.587,-129.63 9.61,-250.69 116.3,-298.78 99.55,-44.89 262.94,-30.97 365.69,-66.02 11.47,-3.91 23.15,-8.19 32.37,-16.07 9.61,-8.2 20.19,-38.7 26.09,-49.87 31.73,-147.18 81.18,-290.781 231.7,-491.148 -4.32,10.699 -8.93,21.269 -13.72,31.75"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path312"
                ></path>
                <path
                  d="m 1433.69,2318.57 c -0.47,6.71 8.74,9.07 15.45,8.65 45.47,-2.85 88.54,-23.23 124.56,-51.12 36.03,-27.89 65.69,-63.07 93.59,-99.09 63.73,-82.3 119.97,-170.96 160.57,-266.79 10.63,-25.08 20.32,-51.67 18.23,-78.82 -3.06,-39.75 -31.75,-74.18 -66.72,-93.32 -34.98,-19.15 -75.54,-25.23 -115.33,-27.88 -20.5,-1.37 -41.06,-1.93 -61.61,-1.66 -18.28,0.24 -41.48,5.13 -44.77,23.11 -3.26,17.76 16.14,30.53 32.56,38.02 22.03,10.04 44.05,20.07 66.06,30.11 7.28,3.32 15.05,7.08 18.9,14.09 6.7,12.23 -1.64,26.9 -8.96,38.78 -34.5,55.9 -51.12,120.61 -73.18,182.48 -19.32,54.16 -43.08,106.73 -70.98,157 l -88.37,126.44"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path314"
                ></path>
                <path
                  d="m 1560.43,2154.6 c -12.57,30.56 -16.75,63.64 -27.1,94.89 -9.12,27.56 -60.63,75.11 -57.2,77.46 -59.82,-52.96 -162.83,-10.2 -162.83,-10.2 0,0 -23.09,0.07 -47.63,-3.23 -10.66,-1.44 -21.32,-2.98 -31.93,-4.8 -6.15,-1.04 -17.34,-1.07 -22.66,-4.43 -25.87,-16.4 -35.74,-59.06 -55.5,-82.46 -125.97,-149.17 -93.25,-307.83 -142.33,-496.8 -6.18,-23.78 -11.79,-48.14 -10.26,-72.65 1.52,-24.52 11.14,-49.57 30.53,-64.65 11.44,-8.89 25.45,-13.77 39.35,-17.88 77.17,-22.81 158.56,-26.09 238.97,-29.21 83.11,-3.22 145.66,-5.28 228.11,5.64 89.86,11.88 126.94,55.92 129.7,71.05 23.99,132.05 -14.11,266.61 -51.86,395.41 -9.18,31.31 -18.42,62.8 -32.62,92.18 -8.07,16.65 -17.7,32.57 -24.74,49.68"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path316"
                ></path>
                <path
                  d="m 1651.63,1591.85 c 6.35,35.15 12.03,70.45 13.72,106.09 1.8,37.93 -0.92,75.91 -3.63,113.78 -1.2,16.75 -2.44,33.61 -3.85,50.51 -11.06,50.71 -25.58,101.03 -40.08,150.51 -9.18,31.31 -18.42,62.8 -32.62,92.18 -8.07,16.65 -17.7,32.57 -24.74,49.68 -8.16,19.86 -12.8,40.79 -17.89,61.59 -5.25,3.2 -10.99,5.07 -17.23,4.48 0.89,-114.19 -0.72,-228.39 -4.81,-342.52 -1.42,-39.51 -4.17,-81.93 -28.78,-112.87 -10.04,-12.61 -23.11,-22.43 -36.23,-31.78 -39.88,-28.44 -81.78,-54.07 -125.26,-76.62 -24.89,-12.91 -50.96,-25.32 -69.74,-46.13 -16.32,-18.07 -25.48,-42.03 -26.67,-66.31 25.99,-1.7 52.05,-2.79 78.02,-3.8 83.11,-3.22 145.66,-5.28 228.11,5.64 56.72,7.5 92.37,27.8 111.68,45.57"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path318"
                ></path>
                <path
                  d="m 1654.7,1594.84 c 9.21,9.19 14.03,17.45 14.95,22.49 3.23,17.77 5.25,35.59 6.39,53.43 l -21.34,-75.92"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path320"
                ></path>
                <path
                  d="m 1370.53,1491.37 c 19.16,76.14 25.84,290.55 25.28,351 -0.74,81.71 -8.55,163.35 -23.31,243.71 -7.37,40.19 -16.48,80.05 -27.31,119.44 -2.88,10.44 -30.68,115.01 -36.79,114.3 -36.28,-4.2 -72.57,-9.79 -97.32,-15.53 -25.87,-16.4 -35.74,-59.06 -55.5,-82.46 -41.24,-48.83 -69.61,-105.96 -86.05,-167.58 -17.25,-64.64 -22.79,-131.63 -31.7,-197.74 -4.59,-34.08 -35.1,-163.43 -58.267,-307.85 306.897,-101.4 390.647,-58.49 390.967,-57.29"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path322"
                ></path>
                <path
                  d="m 1180.98,1811.04 c -25.34,9.98 99.8,302.43 111.86,332.97 5.97,15.13 9.95,28.28 12.94,44.37 6.14,33.02 9.13,77.58 -17.38,103.1 -33.51,32.26 -120.59,7.81 -152.96,-17.13 -44.81,-34.52 -64.18,-66.08 -93.92,-122.93 -61.5,-117.57 -70.989,-241.93 -38.79,-370.65 12.4,-49.54 41.02,-79.35 90.01,-93.79 78.43,-23.1 160.89,95.53 88.24,124.06"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path324"
                ></path>
                <path
                  d="m 1361.79,2138.51 c -2.56,-0.71 -5.12,-1.32 -7.76,-1.16 -11.78,0.77 -16.97,14.96 -19.33,26.55 -2.41,11.8 -4.8,24.22 -1.22,35.73 1.95,6.28 5.55,11.88 8.47,17.77 -2.23,8.23 -5.38,19.66 -8.87,31.94 -56.18,-56.72 -112.35,-113.45 -168.53,-170.17 -32.57,-32.89 -66.06,-67.19 -82.06,-110.62 -24.44,-66.35 -4.5,-144.65 -36.76,-207.57 l -25.05,7.56 c -6.34,-30.95 -13.8,-67.74 -21.446,-108.07 11.906,-1.06 23.816,-2.11 35.726,-3.17 31.8,-2.82 63.91,-5.62 95.54,-1.36 31.63,4.27 63.2,16.29 85.41,39.21 9.37,9.67 16.83,21 24.24,32.26 30.26,46.02 60.52,92.03 90.79,138.05 12.12,18.43 24.28,36.94 33.44,57.01 8.71,19.12 14.58,39.42 19.46,59.86 0.88,3.71 1.69,7.45 2.51,11.17 -3.61,31 -8.22,61.89 -13.85,92.58 -3.22,17.54 -6.84,35.01 -10.71,52.43"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path326"
                ></path>
                <path
                  d="m 1510.19,2313.01 c -3.05,3.33 -34.06,13.94 -34.06,13.94 27.6,-74.96 108.48,-425.85 112.55,-811.45 74.48,7.31 96.97,53.72 96.97,53.72 -10.96,114.54 -26.72,260.29 -45.62,373.81 -34.78,208.87 -106.99,344.92 -129.84,369.98"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path328"
                ></path>
                <path
                  d="m 1827.86,1910.22 c -40.6,95.83 -134.17,232.54 -290.42,380.77 -27.47,-4.95 -50.47,-17 -50.47,-17 0,0 6.99,-32.22 4.05,-35.14 l 15.78,-24.88 c 7.7,-33.66 15.91,-73.12 24.05,-117.22 0.52,-1.83 1.02,-3.65 1.54,-5.47 17.55,-61.47 40.07,-121.51 67.27,-179.36 14.81,-31.5 32.3,-63.5 57.57,-86.67 -2.62,19.95 -5.29,39.69 -8.07,58.82 5.24,-10.69 10.77,-21.24 17.06,-31.42 7.33,-11.88 15.66,-26.55 8.96,-38.78 l -1.18,-1.63 c 2.42,-1.61 4.71,-3.33 7.25,-4.78 15.44,-8.74 33.15,-14.06 50.86,-12.93 14.16,0.92 27.74,5.86 40.8,11.41 14.21,6.04 28.32,13.03 39.56,23.61 11.37,10.7 19.27,24.64 25.03,39.16 1.04,2.66 1.8,5.39 2.72,8.09 -3.38,11.36 -7.75,22.54 -12.36,33.42"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path330"
                ></path>
                <path
                  d="m 1455.24,2360.69 c -12.9,-1.62 -21.53,-9.58 -30.49,-18.19 -8.45,-8.12 -10.51,-22.52 -11.79,-33.67 -0.41,-3.64 -0.64,-7.39 0.33,-10.93 1.55,-5.68 5.94,-10.1 8.85,-15.21 1.15,-2.03 2.11,-4.21 3.79,-5.82 1.68,-1.61 4.37,-2.46 6.35,-1.23 2.78,1.72 2.22,5.94 0.85,8.9 -1.38,2.97 -3.3,6.22 -2.12,9.28 l 0.59,0.97 c 1.61,1.51 3.88,-0.96 4.77,-2.98 4.85,-11.11 12.47,-20.99 21.98,-28.5 2.36,-1.87 4.91,-3.62 7.8,-4.45 4.2,-1.21 8.74,-0.36 12.8,1.25 1.78,0.7 3.7,1.57 5.55,1.07 1.88,-0.51 3.11,-2.25 4.19,-3.87 8.37,-12.46 17.77,-24.21 28.09,-35.12 l 1.9,-1.31 c 0.91,-0.16 1.79,0.36 2.56,0.86 10.15,6.49 20.28,13 30.43,19.49 -6.6,11.03 -14.98,20.87 -22.24,31.48 -8.97,13.11 -16.17,27.34 -23.34,41.53 -6.48,12.83 -12.96,25.66 -19.45,38.49 -1.15,2.27 -2.42,4.67 -4.65,5.89 -1.3,0.72 -2.79,0.95 -4.26,1.17 -7.45,1.08 -15.02,1.84 -22.49,0.9"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path332"
                ></path>
                <path
                  d="m 1532.73,2278.56 c 0,0 -45.76,-12.32 -57.56,-36.63 24.76,-35.84 93.38,-206.26 110.57,-249.54 34.44,-86.72 61.67,-178.7 119.88,-251.63 9.04,-11.33 19.43,-22.55 33.19,-27.09 20.55,-6.78 43.86,3.75 57.36,20.65 13.52,16.89 18.91,38.85 21.57,60.33 8.72,70.4 -8.29,142.28 -38.63,206.42 -54.59,115.38 -246.38,277.49 -246.38,277.49"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path334"
                ></path>
                <path
                  d="m 1334.42,2461.29 c -8.83,-47.9 -15.88,-96.12 -21.12,-144.54 22.5,-16.67 51.77,-22.4 79.7,-20.29 27.92,2.13 74.04,9.83 82.18,26.68 -4.57,16.13 -17.37,71.88 -26.05,107.81"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path336"
                ></path>
                <path
                  d="m 1475.18,2323.14 c -4.55,16.06 -17.24,71.36 -25.92,107.31 l -0.5,0.59 -114.34,30.25 c -3.5,-18.99 -6.64,-38.03 -9.58,-57.11 6.92,-10.84 15.38,-20.68 25.31,-28.87 5.85,-4.82 12.17,-9.14 17.39,-14.65 5.22,-5.5 9.36,-12.51 9.55,-20.09 0.16,-6.23 -2.33,-12.18 -4.4,-18.07 -2.86,-8.1 -4.8,-17.01 -4.9,-25.64 8.38,-0.86 16.85,-1.03 25.21,-0.4 27.92,2.13 74.04,9.83 82.18,26.68"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path338"
                ></path>
                <path
                  d="m 1521.56,2570 c 18.26,-10.21 28.44,-31.19 30.91,-51.96 2.48,-20.78 -1.61,-41.72 -5.67,-62.25 -1.07,-5.38 -2.17,-10.86 -4.89,-15.62 -4.15,-7.33 -12.21,-12.36 -20.63,-12.56 -8.42,-0.2 -16.84,4.6 -20.68,12.09 -2.13,4.14 -2.88,8.84 -3.58,13.43 -2.48,16.18 -4.96,32.34 -7.44,48.5"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path340"
                ></path>
                <path
                  d="m 1521.45,2430.91 c 2.19,28.42 11.26,55.96 11.28,84.69 0.03,34.78 -13.11,65.19 -44.55,81.96 -33.65,17.95 -77.04,18.74 -111.81,3.51 -56.24,-24.61 -84.21,-97.39 -62.48,-154.81 21.74,-57.41 86.33,-104.12 147.11,-95.41 18.56,2.67 38.77,20.76 49.29,36.28 8.56,12.61 9.98,28.58 11.16,43.78"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path342"
                ></path>
                <path
                  d="m 1552.39,2600.97 c -3.84,7.65 -11.96,12.01 -19.69,15.69 -30.37,14.42 -62.67,25.7 -96.18,28.35 -33.49,2.65 -68.41,-3.88 -96.31,-22.63 -21.32,-14.34 -38.42,-36.8 -41,-62.37 -23.94,-41.62 -17.51,-73.06 -16.36,-87.78 0.93,-11.95 5.85,-23.97 15.21,-31.45 9.33,-7.49 23.43,-9.44 33.49,-2.93 7.25,4.69 11.51,12.84 14.31,21.02 8.81,25.61 6.5,54.46 18.02,78.99 1.16,2.49 2.53,5 4.66,6.73 4.92,4.01 12.1,2.83 18.32,1.54 37.76,-7.83 77.38,-11.7 114.62,-1.69 15.57,4.17 30.87,11 42.03,22.64 8.63,8.99 14.47,22.74 8.88,33.89"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path344"
                ></path>
                <path
                  d="m 2020.34,1683.91 h -533.96 l 107.61,307.61 c 3.36,9.58 12.4,16 22.55,16 h 492.24 c 12.12,0 20.6,-11.96 16.6,-23.4 l -105.04,-300.21"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path346"
                ></path>
                <path
                  d="m 1560.43,1683.91 h -290.61 v 25.55 h 290.61 v -25.55"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path348"
                ></path>
                <path
                  d="m 1357.7,2482.99 c -2.63,3.48 -5.31,7.04 -8.91,9.52 -3.59,2.47 -8.33,3.72 -12.4,2.13 -3.3,-1.28 -5.68,-4.19 -7.6,-7.17 -5.74,-8.91 -8.75,-19.79 -7.08,-30.25 1.67,-10.46 8.39,-20.28 18.1,-24.51 9.71,-4.23 22.17,-2.1 29.09,5.92"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path350"
                ></path>
                <path
                  d="m 1424.2,2282.13 c 13.01,-62.88 23.15,-126.9 37.43,-189.42 0.66,-2.92 5.47,-2.34 5.28,0.72 -3.76,63.2 -19.84,129.55 -39.03,189.71 -0.75,2.37 -4.18,1.4 -3.68,-1.01"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path352"
                ></path>
                <path
                  d="m 1451.68,2252.34 c 4.02,0 4.02,6.24 0,6.24 -4.01,0 -4.02,-6.24 0,-6.24"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path354"
                ></path>
                <path
                  d="m 1467.12,2215.48 c 5.37,0 5.38,8.35 0,8.35 -5.37,0 -5.38,-8.35 0,-8.35"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path356"
                ></path>
                <path
                  d="m 1477.01,2177.76 -1.39,0.38 c -5.97,1.61 -6,-8.76 0,-7.14 l 1.39,0.37 c 3.16,0.85 3.17,5.54 0,6.39"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path358"
                ></path>
                <path
                  d="m 1485.64,2127.2 0.75,0.69 v 2.87 l -0.75,0.69 c -1.87,1.76 -5.12,0.54 -5.12,-2.12 0,-2.66 3.25,-3.89 5.12,-2.13"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path360"
                ></path>
                <path
                  d="m 1511.46,2487.97 c -3.5,5.45 -8.87,6.71 -13.69,-4.08 -3.03,-6.8 -4.12,-20.21 5.47,-22.06 14.66,-2.83 13.92,17.23 8.22,26.14"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path362"
                ></path>
                <path
                  d="m 1512.32,2481.66 c -1.55,2.41 -3.92,2.97 -6.06,-1.82 -1.35,-3 -1.83,-8.95 2.43,-9.77 6.5,-1.26 6.16,7.64 3.63,11.59"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path364"
                ></path>
                <path
                  d="m 1420.99,2490.03 c -3.93,5.78 -9.94,7.11 -15.32,-4.29 -3.38,-7.18 -4.57,-21.37 6.18,-23.34 16.41,-3.01 15.54,18.22 9.14,27.63"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path366"
                ></path>
                <path
                  d="m 1421.97,2483.36 c -1.74,2.56 -4.4,3.15 -6.78,-1.9 -1.51,-3.19 -2.04,-9.48 2.73,-10.35 7.28,-1.33 6.89,8.07 4.05,12.25"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path368"
                ></path>
                <path
                  d="m 1392.87,2522.81 c 5.07,-0.34 10.05,-1.34 14.86,-2.94 2.34,-0.78 4.59,-1.72 6.83,-2.75 2.17,-0.99 5.01,-3.29 7.4,-2.12 l 0.99,1.72 c -0.25,2.8 -3.8,3.91 -6.06,4.9 -2.56,1.11 -5.21,2.02 -7.92,2.75 -5.24,1.41 -10.67,2.13 -16.1,2.19 -2.43,0.02 -2.38,-3.58 0,-3.75"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path370"
                ></path>
                <path
                  d="m 1523.57,2530.03 c -4.73,2.94 -10.44,2.39 -15.26,-0.04 -2.29,-1.16 -4.52,-2.77 -6.37,-4.56 -0.89,-0.86 -1.67,-1.88 -2.44,-2.85 -0.87,-1.11 -1.21,-2.56 -1.8,-3.84 -0.71,-1.52 0.81,-3.5 2.46,-2.46 l 1.27,0.8 1.53,0.72 c 1.03,0.62 1.89,1.63 2.81,2.42 1.62,1.39 3.02,2.85 4.81,3.97 3.29,2.08 7.56,3.28 11.37,1.99 2.33,-0.78 3.61,2.62 1.62,3.85"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path372"
                ></path>
                <path
                  d="m 1440.22,2406.73 0.02,1.22 c 16.14,0.3 32.28,0.59 48.41,0.9 l 1.27,-0.47 -0.02,-0.88 c -0.8,-3.02 -1.59,-6.03 -2.38,-9.04 -0.91,-3.44 -1.87,-6.98 -3.98,-9.84 -1.88,-2.54 -4.57,-4.37 -7.43,-5.68 -7.95,-3.64 -17.57,-3.34 -25.31,0.7 -3.23,1.69 -6.2,4.07 -8.04,7.22 -1.83,3.15 -3.97,13.74 -2.52,17.09"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path374"
                ></path>
                <path
                  d="m 1477.6,2458.91 c 2.39,-4.53 4.49,-9.19 6.3,-13.98 1.68,-4.76 3.67,-10.06 1.3,-16.41 -0.76,-1.56 -2.13,-2.99 -3.78,-3.77 -1.6,-0.72 -3.47,-0.88 -4.62,-0.87 -2.6,-0.02 -5.21,0.02 -7.79,0.35 -5.15,0.53 -10.21,1.89 -14.9,3.99 5.14,-0.21 10.13,-0.22 15.06,-0.1 2.47,0.14 4.92,0.19 7.36,0.47 2.52,0.18 3.47,0.64 4.17,2.1 1.44,3.22 0.53,8.51 -0.54,13.21 -1.16,4.88 -2,9.86 -2.56,15.01"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path376"
                ></path>
                <path
                  d="m 1369.53,2271.68 c 11.5,26.19 26.21,50.96 43.7,73.58 3.13,4.04 6.36,8.03 10.21,11.38 9.1,7.94 20.95,11.79 32.46,15.43 3.54,1.13 7.19,2.28 10.91,2.12 3.44,-0.14 6.74,-1.37 9.98,-2.59 11.38,-4.31 32.63,-15.44 31.39,-17.82 -2.74,-5.24 -6.47,-4.25 -8.77,-3.99 -9.67,1.15 -17.3,4.25 -26.98,5.39 4.64,-1.81 9.63,-3.93 12.06,-8.27 2.43,-4.34 0.18,-11.35 -4.8,-11.44 3.95,1.03 8.49,-0.92 10.48,-4.5 1.97,-3.58 1.19,-8.46 -1.8,-11.25 -1.44,-1.35 -3.51,-2.63 -3.33,-4.59 0.14,-1.48 1.51,-2.46 2.53,-3.54 4.4,-4.65 1.98,-11.03 -1.74,-15.21 -4.49,-5.07 -8.99,-10.14 -13.5,-15.21 -1.6,-1.8 -3.2,-4.82 -5.57,-4.44 -7.68,1.24 0.25,13.9 0.25,13.9 0,0 -13.61,-12.23 -20.43,-18.34 -4.76,-4.29 -10.56,-11.19 -18.02,-7.67 -1.87,0.89 -3.41,2.86 -5.47,2.67 -1.43,-0.11 -2.52,-1.25 -3.48,-2.33 -5.89,-6.57 -11.77,-13.14 -17.66,-19.72"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path378"
                ></path>
                <path
                  d="m 1422.52,2355.52 c 9.98,6.78 21.08,11.98 32.85,14.72 5.91,1.38 11.87,2.4 17.9,1.25 2.77,-0.52 5.49,-1.34 8.11,-2.38 2.58,-1.02 5.18,-2.67 7.95,-3.1 l 1.05,1.37 c -3.21,4.16 -10.22,6.01 -15.14,7.06 -6.27,1.36 -12.23,0.69 -18.44,-0.66 -12.99,-2.81 -25.11,-8.38 -35.6,-16.54 -0.98,-0.76 0.29,-2.42 1.32,-1.72"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path380"
                ></path>
                <path
                  d="m 1444.82,2345.73 c 3.98,1.82 8.09,3.34 12.3,4.56 2.05,0.59 4.11,1.11 6.19,1.55 1.05,0.21 2.09,0.42 3.14,0.6 1.03,0.18 2.24,0.17 3.12,0.8 0.77,0.56 0.66,1.68 -0.26,1.99 -1.07,0.38 -2.26,-0.02 -3.34,-0.22 -1.05,-0.19 -2.08,-0.4 -3.13,-0.64 -2.21,-0.48 -4.42,-1.07 -6.6,-1.73 -4.32,-1.31 -8.53,-2.96 -12.6,-4.89 -1.36,-0.64 -0.17,-2.64 1.18,-2.02"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path382"
                ></path>
                <path
                  d="m 1465.78,2306.81 c 2.82,1.31 5.76,2.1 8.72,2.99 1.44,0.44 2.9,0.75 4.35,1.12 1.52,0.4 3.13,0.56 4.55,1.26 l -0.27,2.01 0.78,-0.77 -0.78,0.77 c -1.5,0.48 -3.19,0.25 -4.74,0.1 -1.69,-0.17 -3.37,-0.57 -5.01,-1.02 -3.12,-0.86 -6.15,-2.58 -8.86,-4.31 -1.38,-0.87 -0.18,-2.82 1.26,-2.15"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path384"
                ></path>
                <path
                  d="m 1459.54,2327.29 c 3.41,1.86 6.94,3.1 10.67,4.12 3.72,1 7.61,1.21 11.18,2.68 1.23,0.52 1.34,2.17 0,2.64 -4.03,1.4 -8.45,0.32 -12.38,-0.95 -3.94,-1.27 -7.71,-3.35 -11.08,-5.73 -1.66,-1.17 -0.22,-3.77 1.61,-2.76"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path386"
                ></path>
                <path
                  d="m 1468.96,2290.64 1.24,0.77 0.78,0.8 1.6,1.74 1.52,1.73 0.93,1.21 0.42,0.88 0.14,0.85 -1.61,1.6 -0.85,-0.12 -0.82,-0.4 -1.23,-1 -1.61,-1.74 -1.65,-2.17 -0.6,-1 -0.44,-1.48 0.52,-1.56 1.66,-0.11"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path388"
                ></path>
                <path
                  d="m 1063.23,1895.92 c 53.24,131.14 246.5,322.42 306.57,386.59 4.85,-0.2 39.48,-16.82 48.88,-39.34 -41.9,-153.99 -143.46,-459.65 -250.38,-533.98 -20.75,-14.41 -46.95,-25.58 -72.7,-22.44 -31.51,3.84 -63.17,35.57 -79.85,61.05 -5.1,7.8 -7.31,17.06 -9.44,26.13"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path390"
                ></path>
                <path
                  d="m 1659.88,1686.41 h 104.26 l 14.29,212.13 H 1645.6 l 14.28,-212.13 m 108.94,-5 h -113.61 l -14.95,222.13 h 143.51 l -14.95,-222.13"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path392"
                ></path>
                <path
                  d="m 1754.09,1697.17 8.61,128.06 h -70.92 l -3.57,35.89 c -1.38,12.09 -7.68,18.5 -13.24,18.5 -5.65,0 -10.52,-6.6 -8.71,-20.59 l 3.16,-33.8 h -8.09 l 8.61,-128.06 -12.83,190.61 h 109.8 l -12.82,-190.61"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path394"
                ></path>
                <path
                  d="m 1754.09,1697.17 h -84.15 l -8.61,128.06 h 8.09 l 9.4,-100.48 h 22.96 l -10,100.48 h 70.92 l -8.61,-128.06"
                  style={{
                    fill: "#d7bff6",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path396"
                ></path>

                <img src="https://lh3.googleusercontent.com/a/ACg8ocJRsBZS82QBmvKCMDAuKlhq3Q8H0saunMre4VJSyJv9_IFa=s96-c" />
              </g>
            </g>
          </svg>
        </div>
        <div className="text-gray-500 font-bold text-2xl p-2 ">
          Name
          <div className="border-b-2 border-gray-500 "></div>
          <div className="text-6xl text-violet-600 sm:text-4xl">
            {user.firstName} {user.lastName}
          </div>
        </div>
        <div className="bottom overflow-auto">
          <div className=" m-[1rem] rounded-lg opacity-[90%] ">
            <div className="flex flex-row ">
              <span className="flex justify-between items-start p-2 text-xl mr-12">
                Email
              </span>
              <div className="flex flex-row justify-between items-center mr-2  w-full ">
                <span className="flex justify-start items-start p-2 bg-gradient-to-tr from-green-100 via-violet-50 rounded-lg shadow-2xl text-gray-900 font-semibold hover:text-violet-700 relative">
                  {user.email}
                </span>
                <button className="p-1 border-2 border-gray-500 rounded-lg shadow-2xl hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white ml-[2em] ">
                  Edit
                </button>
              </div>
            </div>
            <div className="border-b-2 border-gray-500 w-96 ml-4"></div>
            <div className="flex flex-row">
              <span className="flex justify-between items-start p-2 text-xl mr-2">
                Username
              </span>
              <div className="flex flex-row justify-between items-center mr-2  w-full ">
                <span className="flex justify-start items-start p-2 bg-gradient-to-tr from-green-100 via-violet-50 rounded-lg shadow-2xl text-gray-900 font-semibold hover:text-violet-700 relative">
                  {user.username}
                </span>
                <button className="p-1 border-2 border-gray-500 rounded-lg shadow-2xl hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white ml-[2em] ">
                  Edit
                </button>
              </div>
            </div>
            <div className="border-b-2 border-gray-500 w-96 ml-4"></div>
            <div className="flex flex-row">
              <span className="flex justify-start items-start p-2 text-xl mr-2">
                Recruiter
              </span>
              <span className="flex justify-start items-start p-2">
                <Toggle
                  handleToggle={handleToggle}
                  popup={popup}
                  checked={checked}
                  handlePopup={handlePopup}
                />
              </span>
            </div>
          </div>
        </div>
        {/* <div className="bottom ">
        <div className="p-6 bg-gradient-to-br from-green-300 via-yellow-200 via-orange-300 to-violet-100">
          <div className="text-gray-500 font-bold text-2xl">Name</div>
          <div className="border-b-2 border-gray-500 p-2 "></div>
          <div className="text-6xl text-green-100 sm:text-4xl">
            {user.firstName} {user.lastName}
          </div>
        </div>

        <div className="bottom-bottom">
          <div className="social-links-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="15.999"
              viewBox="0 0 16 15.999"
            >
              <path
                id="Subtraction_4"
                data-name="Subtraction 4"
                d="M6-582H-2a4,4,0,0,1-4-4v-8a4,4,0,0,1,4-4H6a4,4,0,0,1,4,4v8A4,4,0,0,1,6-582ZM2-594a4,4,0,0,0-4,4,4,4,0,0,0,4,4,4,4,0,0,0,4-4A4.005,4.005,0,0,0,2-594Zm4.5-2a1,1,0,0,0-1,1,1,1,0,0,0,1,1,1,1,0,0,0,1-1A1,1,0,0,0,6.5-596ZM2-587.5A2.5,2.5,0,0,1-.5-590,2.5,2.5,0,0,1,2-592.5,2.5,2.5,0,0,1,4.5-590,2.5,2.5,0,0,1,2-587.5Z"
                transform="translate(6 598)"
              ></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
            </svg>
          </div>
          <button className="button">Contact Me</button>
        </div>
      </div> */}
      </div>
    </>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    photoURL: PropTypes.string, // Assuming photoURL is a string
    firstName: PropTypes.string, // Assuming first
    lastName: PropTypes.string, // Assuming last is a string
    type: PropTypes.string, // Assuming type is a string
    username: PropTypes.string, // Assuming username is a string
    email: PropTypes.string, // Assuming email is a string
    recruiter: PropTypes.bool,
    _id: PropTypes.string,

    // Add more validations for other properties of the user object if necessary
  }).isRequired,
  token: PropTypes.string,
  truncateFileName: PropTypes.func.isRequired,
  findAndSetProfilePhoto: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired,
  handleFileSelection: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  displayImage: PropTypes.string.isRequired,
  updateBtn: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string, // errorMessage is optional, so it's defined as a string
  updateClicks: PropTypes.number,
  file: PropTypes.object,
  handleUpdate: PropTypes.func,
  options: PropTypes.bool,
  handleOptions: PropTypes.func.isRequired,
  handleToggle: PropTypes.func,
  popup: PropTypes.bool,
  checked: PropTypes.bool,
  handlePopup: PropTypes.func,
  handleDelete: PropTypes.func,
};

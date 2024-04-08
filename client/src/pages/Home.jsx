import { useEffect, useState } from "react";
import Timeline from "../components/Timeline";
import { useSelector } from "react-redux";
import MessagesCentre from "../components/MessagesCentre";
import Cookies from "js-cookie";
import { InfiniteMovingCards } from "../components/infiniteMovingCards";
import { Tabs } from "../components/AnimatedTabs";
import {
  fetchTestimonials,
  fetchTimeline,
  fetchCertificates,
} from "../services/home_api";
import Loader from "../components/Loader";
import sww from "../images/home/somethingWentWrong.jpeg";
import { useFetchData } from "../hooks/useFetchData";
import { useCertificateDownload } from "../hooks/useCertificateDownload";

const Home = () => {
  const { token } = useSelector((state) => state.user);
  const { currentUser } = useSelector((state) => state.user);
  const isLoggedIn = useSelector((state) => state.user.signInSuccess);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const cftList = [
    { name: "All", type: "pdf" },
    { name: "Django Developer", type: "pdf" },
  ];

  const {
    handleDownload,
    handleDownloadModal,
    handleCloseModal,
    handleOptionChange,
    downloading,
    showModal,
    downloadCount,
    downloadSuccess,
    errorDownloading,
    downloadingFilesModal,
    selectedCft,
  } = useCertificateDownload(token, cftList);

  const {
    data: content,
    loading: initLoading,
    error: errorMessage,
  } = useFetchData(fetchTimeline, token);
  const {
    data: testimonials,
    loading: loadingTestimonials,
    error: errorMessageTestimonials,
  } = useFetchData(fetchTestimonials, token);
  const {
    data: certificates,
    loading: loadingCertificates,
    error: errorCertificates,
  } = useFetchData(fetchCertificates, token);

  useEffect(() => {
    const loginSuccessCookie = Cookies.get("loginSuccess") === "true";
    if (isLoggedIn && !loginSuccessCookie) {
      setShowSuccessMessage(true);
      Cookies.set("loginSuccess", "true");
    }
  }, [isLoggedIn]);

  return (
    <>
      {initLoading ? (
        <span className="flex flex-col justify-center items-center h-screen">
          <Loader />
        </span>
      ) : errorMessage ? (
        <div className="flex flex-col justify-center items-center">
          <img
            className="border rounded-3xl w-[100%] h-screen"
            src={sww}
            alt="AI GENERATED IMAGES"
          />
          <MessagesCentre messageText={errorMessage} type="error" />
        </div>
      ) : (
        <>
          {showModal && (
            <div>
              {/* Overlay to block interaction with the webpage */}
              <div className="fixed inset-0 z-50 bg-black bg-opacity-50" />
              {/* Modal content */}
              <div className="fixed inset-0 z-50 overflow-auto flex justify-center items-center">
                {downloadingFilesModal ? (
                  <div className="h-[10rem] w-[10rem] flex flex-col justify-center items-center">
                    <span className="text-white p-2 font-bold">
                      Downloading...
                    </span>
                    <Loader />
                  </div>
                ) : (
                  <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-xl  mb-4 text-gray-500">
                      Download Certificate(s)
                    </h2>
                    {/* Dropdown */}
                    <select
                      className="block w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 mb-4"
                      value={selectedCft}
                      onChange={handleOptionChange}
                    >
                      {cftList.map((cft, index) => (
                        <option key={index} value={cft.name}>
                          {cft.name}
                        </option>
                      ))}
                    </select>
                    {/* Action buttons */}
                    <div className="flex justify-end">
                      <button
                        onClick={handleCloseModal}
                        className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md mr-2 hover:bg-gray-300"
                      >
                        Close
                      </button>
                      <button
                        onClick={handleDownloadModal}
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <Timeline content={content} />
          <div className="md:[perspective:1000px]  md:flex flex-col justify-center items-center bg-gradient-to-br from-white via-gray-400 to-yellow-200 w-full shadow-transparent ">
            {loadingCertificates ? (
              <span className="p-[10rem]">
                <Loader />
              </span>
            ) : certificates ? (
              <Tabs
                propTabs={certificates}
                handleDownload={handleDownload}
                downloading={downloading}
                errorDownloading={errorDownloading}
                downloadCount={downloadCount}
                downloadSuccess={downloadSuccess}
              />
            
            ) : (
              errorCertificates && (
                <div className="p-[5rem] flex flex-col items-center justify-center">
                  <MessagesCentre
                    messageText={errorMessageTestimonials}
                    type="error"
                    mt={0}
                    top={0}
                  />
                  <img
                    className="border rounded-3xl w-[40%] flex justify-between items-center"
                    src={sww}
                    alt="AI GENERATED IMAGES"
                  />
                </div>
              )
            )}
          </div>
          <div className="flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-between relative overflow-hidden ">
            <div className="text-white ">What people think about me?</div>
            {loadingTestimonials ? (
              <span className="p-[10rem]">
                <Loader />
              </span>
            ) : testimonials ? (
              <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
              />
            ) : (
              errorMessageTestimonials && (
                <div className="p-[5rem] flex flex-col items-center justify-center">
                  <MessagesCentre
                    messageText={errorMessageTestimonials}
                    type="error"
                    mt={0}
                    top={0}
                  />
                  <img
                    className="border rounded-3xl size-[30%] flex justify-between items-center"
                    src={sww}
                    alt="AI GENERATED IMAGES"
                  />
                </div>
              )
            )}
          </div>
          {showSuccessMessage && (
            <MessagesCentre
              messageText={`Welcome ${currentUser.firstName}!`}
              type="success"
              top={16}
              mt={0}
            />
          )}
        </>
      )}
    </>
  );
};

export default Home;

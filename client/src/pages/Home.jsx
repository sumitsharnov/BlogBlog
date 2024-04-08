import { useEffect, useState, useCallback } from "react";
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
  downloadCfts,
} from "../services/home_api";
import Loader from "../components/Loader";
import sww from "../images/home/somethingWentWrong.jpeg";

const Home = () => {
  const { token } = useSelector((state) => state.user);
  const { currentUser } = useSelector((state) => state.user);
  const [content, setContent] = useState(null);
  const [testimonials, setTestimonials] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessageTestimonials, setErrorMessageTestimonials] =
    useState(null);
  const isLoggedIn = useSelector((state) => state.user.signInSuccess);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [loadingTestimonials, setLoadingTestimonials] = useState(false);
  const [loadingCertificates, setLoadingCertificates] = useState(false);
  const [certificates, setCertificates] = useState(null);
  const [errorCertificates, setErrorCertificates] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [errorDownloading, setErrorDownloading] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [downloadingFilesModal, setDownloadingFilesModal] = useState(false);
  const [downloadCount, setDownloadCount] = useState(0);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const cftList = [
    { name: "All", type: "pdf" },
    { name: "Django Developer", type: "pdf" },
  ];
  const [selectedCft, setSelectedCft] = useState(cftList[0].name);

  useEffect(() => {
    const loginSuccessCookie = Cookies.get("loginSuccess") === "true";
    if (isLoggedIn && !loginSuccessCookie) {
      setShowSuccessMessage(true);
      Cookies.set("loginSuccess", "true");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchTimeline(token);
        setContent(data);
        setInitLoading(false);
      } catch (error) {
        setInitLoading(false);
        setErrorMessage("Something went wrong");
      }
    }
    fetchData();
  }, [token]);

  useEffect(() => {
    async function fetchData() {
      setLoadingTestimonials(true);
      try {
        const data = await fetchTestimonials(token);
        setTestimonials(data);
      } catch (error) {
        setLoadingTestimonials(false);
        setErrorMessageTestimonials(error.message);
      }
      setLoadingTestimonials(false);
    }
    fetchData();
  }, [token]);

  useEffect(() => {
    async function fetchData() {
      setLoadingCertificates(true);
      try {
        const data = await fetchCertificates(token);
        setCertificates(data);
      } catch (error) {
        setLoadingCertificates(false);
        setErrorCertificates(error.message);
      }
      setLoadingCertificates(false);
    }
    fetchData();
  }, [token]);

  const handledownload = useCallback(async () => {
    setDownloading(true);
    setShowModal(true);
    setDownloadSuccess(false);
    setErrorDownloading(null);
    document.body.style.overflow = "hidden";
  }, []);

  const handleDownloadModal = async () => {
    setDownloadCount((prev)=> prev+1)
    try{
    setDownloadingFilesModal(true);
    const cft = cftList.find((c) => c.name === selectedCft);
    await downloadCfts(cft, token);
    setDownloadSuccess(true);
    document.body.style.overflow = "auto";
    setShowModal(false);
    setDownloading(false);
    setDownloadingFilesModal(false);
    }catch(e){
      document.body.style.overflow = "auto";
      setErrorDownloading(e.message);
    }
    document.body.style.overflow = "auto";
    setShowModal(false);
    setDownloading(false);
    setDownloadingFilesModal(false);
  };

  const handleCloseModal = async () => {
    setShowModal(false);
    setDownloading(false);
  };

  const handleOptionChange = (event) => {
    setSelectedCft(event.target.value);
  };

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
                    {/* OK button */}
                    <div className="flex flex-row gap-2">
                      <button
                        onClick={handleDownloadModal}
                        className="border border-blue-500 hover:bg-blue-400 hover:text-white font-bold py-2 px-4 rounded text-blue-400"
                      >
                        OK
                      </button>
                      <button
                        onClick={handleCloseModal}
                        className="bg-white hover:bg-red-400 hover:text-white text-red-500 font-bold py-2 px-4 rounded border border-red-500"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <Timeline content={content} />
          <div className="h-[30rem] md:[perspective:1000px]  md:flex flex-col justify-center items-center bg-gradient-to-br from-white via-gray-400 to-yellow-200 w-full shadow-transparent">
            {loadingCertificates ? (
              <span className="p-[10rem]">
                <Loader />
              </span>
            ) : certificates ? (
              <Tabs
                propTabs={certificates}
                handleDownload={handledownload}
                downloading={downloading}
                errorDownloading={errorDownloading}
                key= {downloadCount}
                downloadSuccess = {downloadSuccess}
              />
            ) : (
              errorCertificates && (
                <div className="p-[5rem] flex flex-col items-center justify-center">
                  <MessagesCentre
                    messageText={errorMessageTestimonials}
                    type="error"
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
                    mt = {0}
                    top = {0}
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
            />
          )}
        </>
      )}
    </>
  );
};

export default Home;

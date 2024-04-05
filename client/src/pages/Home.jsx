import { useEffect, useState, useCallback } from "react";
import Timeline from "../components/Timeline";
import { useSelector } from "react-redux";
import MessagesCentre from "../components/MessagesCentre";
import Cookies from "js-cookie";
import { InfiniteMovingCards } from "../components/infiniteMovingCards";
import { Tabs } from "../components/AnimatedTabs";
import { fetchTestimonials, fetchTimeline, fetchCertificates } from "../services/home_api";
import Loader from "../components/Loader";
import sww from "../images/home/somethingWentWrong.jpeg";

const Home = () => {
  const { token } = useSelector((state) => state.user);
  const {currentUser} = useSelector((state) => state.user)
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
    try {
      const res = await fetch("http://localhost:3000/api/download/image.png", {
        method: "GET",
        headers: { Authorization: token },
      });
      
      // Convert the response to blob
      const blob = await res.blob();
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary anchor element
      const a = document.createElement('a');
      a.href = url;
      a.download = 'image.png'; // Specify the filename
      a.click(); // Trigger the download
      
      // Release the object URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }, []);

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
          <Timeline content={content} />
          <button onClick={handledownload}>Download</button>
          <div className="h-[30rem] md:[perspective:1000px]  md:flex flex-col justify-center items-center bg-gradient-to-br from-white via-gray-400 to-yellow-200 w-full shadow-transparent">
            {certificates && <Tabs propTabs={certificates} />}
          </div>
          <div className="flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-between relative overflow-hidden ">
            <div className="text-white ">What people think about me?</div> 
            {loadingTestimonials ? (
              <span className="p-[10rem]">
                <Loader />
              </span>
            ) : (
              testimonials && (
                <InfiniteMovingCards
                  items={testimonials}
                  direction="right"
                  speed="slow"
                />
              )
            )}
       
            {errorMessageTestimonials && (
              <div className="p-[5rem] flex flex-col items-center justify-center">
                <MessagesCentre
                  messageText={errorMessageTestimonials}
                  type="error"
                />
                <img
                  className="border rounded-3xl size-[30%] flex justify-between items-center"
                  src={sww}
                  alt="AI GENERATED IMAGES"
                />
              </div>
            )}
          </div>
          {showSuccessMessage && (
            <MessagesCentre messageText={`Welcome ${currentUser.firstName}!`} type="success" />
          )}
        </>
      )}
    </>
  );
};

export default Home;
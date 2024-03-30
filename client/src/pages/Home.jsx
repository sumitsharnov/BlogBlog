import { useEffect, useMemo, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import Timeline from "../components/Timeline";
import { useSelector } from "react-redux";
import MessagesCentre from "../components/MessagesCentre";
import Cookies from "js-cookie";
import { InfiniteMovingCards } from "../components/infiniteMovingCards";
import { Tabs } from "../components/AnimatedTabs";
import { fetchTestimonials, fetchTimeline } from "../services/home_api";
import Loader from "../components/Loader";
import sww from "../images/home/somethingWentWrong.jpeg";

const Home = () => {
  const { token } = useSelector((state) => state.user);
  const [content, setContent] = useState(null);
  const [testimonials, setTestimonials] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessageTestimonials, setErrorMessageTestimonials] =
    useState(null);
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef(null);
  const isLoggedIn = useSelector((state) => state.user.signInSuccess);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [loadingTestimonials, setLoadingTestimonials] = useState(false);

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
          <div className="h-[30rem] [perspective:1000px]  md:flex flex-col justify-center items-center bg-gradient-to-br from-white via-gray-400 to-yellow-200 w-full shadow-transparent hidden">
            <Tabs propTabs={tabs} />
          </div>
          <div className="rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-between relative overflow-hidden">
            <span className="text-white">What people think about me?</span>
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
        </>
      )}
    </>
  );
};

export default Home;
const tabs = [
  {
    title: "Product",
    value: "product",
    content: "Product",
  },
  {
    title: "Services",
    value: "services",
    content: "Services",
  },
  {
    title: "Playground",
    value: "playground",
    content: "Playground",
  },
  {
    title: "Content",
    value: "content",
    content: "Content",
  },
  {
    title: "Random",
    value: "random",
    content: "Random",
  },
];

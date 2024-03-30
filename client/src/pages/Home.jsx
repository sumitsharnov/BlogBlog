import { useEffect, useMemo, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { useSelector } from "react-redux";
import MessagesCentre from "../components/MessagesCentre";
import { GoogleGeminiEffect } from "../components/GeminiEffect";
import Cookies from "js-cookie";
import { InfiniteMovingCards } from "../components/infiniteMovingCards";
import { Tabs } from "../components/AnimatedTabs";
import { fetchTestimonials, fetchTimeline } from "../services/home_api";
import Loader from "../components/Loader";
import sww from "../images/home/somethingWentWrong.jpeg";
import { useFetcher } from "react-router-dom";

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
  const backgroundColors = ["var(--black)", "var(--black)", "var(--black)"];
  const linearGradients = [
    "linear-gradient(to bottom right, var(--orange-500), var(--blue-500))",
    "linear-gradient(to bottom right, var(--white), var(--red-500))",
    "linear-gradient(to bottom right, var(--white), var(--gray-500))",
    "linear-gradient(to bottom right, var(--green-500), var(--blue-500))",
    "linear-gradient(to bottom right, var(--green-500), var(--gray-500))",
    "linear-gradient(to bottom right, var(--green-500), var(--blue-500), var(--yellow-500))",
    "linear-gradient(to bottom right, var(--red-500), var(--yellow-500), var(--blue-500))",
  ];
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

  const { scrollYProgress } = useScroll({
    container: ref,
    target: ref,
    offset: ["start start", "end start"],
  });

  const cardLength = content && content.length;

  const pathLengthFirst = useTransform(scrollYProgress, [0, 1], [0.0, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 1], [0.0, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 1], [0.0, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 1], [0.0, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 1], [0, 1.2]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints =
      content && content.map((_, index) => index / cardLength);
    const closestBreakpointIndex =
      cardsBreakpoints &&
      cardsBreakpoints.reduce((acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      }, 0);
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <>
    {
      errorMessage ? (
        // Error message handling
        <>
          <h4>Something Went Wrong, Please try after some time</h4>
          <MessagesCentre messageText={errorMessage} type="error" />
        </>
      ) :
        // Render content when it's loaded
        
        <div className={ "flex flex-col bg-black"}>
          <div>
            <p className="text-lg md:text-7xl font-normal text-center bg-clip-text text-transparent bg-gradient-to-b from-blue-500 via-purple-500 to-red-500">
              {`Timeline`}
            </p>
            <p className="text-xs md:text-xl font-normal text-center text-neutral-400  max-w-lg mx-auto p-2">
              {`Explore my journey through time`}
            </p>
          </div>

          <div
            className="h-72 lg:inline-block hidden w-full dark:border dark:border-white/[0.1] rounded-md relative overflow-clip top-2"
            ref={ref}
          >
            <GoogleGeminiEffect
              pathLengths={[
                pathLengthFirst,
                pathLengthSecond,
                pathLengthThird,
                pathLengthFourth,
                pathLengthFifth,
              ]}
            />
          </div>

          <div>
            <motion.div
              animate={{
                backgroundColor:
                  backgroundColors[activeCard % backgroundColors.length],
              }}
              className="h-[25em] overflow-y-auto flex justify-center relative  "
              ref={ref}
            >
              <div className="div relative flex items-start px-5">
                <div className="max-w-2xl">
                  {content &&
                    content.map((item, index) => (
                      <div key={item.title + index} className="my-20">
                        <motion.h2
                          initial={{
                            opacity: 0,
                          }}
                          animate={{
                            opacity: activeCard === index ? 1 : 0.3,
                          }}
                          className="text-2xl font-bold text-slate-100"
                        >
                          {item.title}
                        </motion.h2>
                        <motion.p
                          initial={{
                            opacity: 0,
                          }}
                          animate={{
                            opacity: activeCard === index ? 1 : 0.3,
                          }}
                          className="text-kg text-slate-300 max-w-sm mt-4"
                        >
                          {item.description}
                        </motion.p>
                        <a
                          href={content && content[activeCard].url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <motion.div
                            initial={{
                              opacity: 0,
                            }}
                            animate={{
                              background:
                                linearGradients[
                                  activeCard % linearGradients.length
                                ],
                              opacity: activeCard === index ? 1 : 0.3,
                            }}
                            className="border  rounded-2xl p-2 mt-2 mb-2 text-center cursor-pointer shadow-md  transform transition-transform duration-200 hover:scale-105 focus:scale-105 active:scale-100 hover:font-
                        w-[50%]"
                          >
                            {item.content}
                          </motion.div>
                        </a>
                      </div>
                    ))}
                  <div />
                </div>
              </div>
              <motion.div
                animate={{
                  background:
                    linearGradients[activeCard % linearGradients.length],
                }}
                className={cn(
                  "hidden lg:block h-60 w-80 rounded-md bg-white sticky top-10 overflow-hidden right-4"
                )}
              >
                <a
                  href={content && content[activeCard].url}
                  className="flex flex-col justify-center items-center h-full"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="w-40 h-40 border rounded-full border-blue-400 shadow-2xl"
                    src={content && content[activeCard].image}
                    alt="Content"
                  />
                  <motion.p
                    animate={{
                      opacity: 1,
                      color: "var(--white)",
                    }}
                    className="pl-2 pr-2"
                  >
                    <span>{content && content[activeCard].title}</span>
                  </motion.p>
                </a>
              </motion.div>
            </motion.div>

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
          
          </div>
          {showSuccessMessage && (
            <MessagesCentre messageText={"Welcome!"} type="success" />
          )}
        </div>
      }
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

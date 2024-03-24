import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { useSelector } from "react-redux";
import MessagesCentre from "../components/MessagesCentre";
import { GoogleGeminiEffect } from "../pages/GeminiEffect";
import Cookies from "js-cookie";

const Home = () => {
  const { token } = useSelector((state) => state.user);
  const [content, setContent] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef(null);
  const isLoggedIn = useSelector((state) => state.user.signInSuccess);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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
        const res = await fetch("/api/timeline/content", {
          method: "GET",
          headers: { Authorization: token },
        });
        const data = await res.json();
        setContent(data);
        if (!res.ok) {
          setErrorMessage(res.Message);
        }
      } catch (error) {
        setErrorMessage("Something went wrong");
      }
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
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = ["var(--black)", "var(--black)", "var(--black)"];
  const linearGradients = [
    "linear-gradient(to bottom right, var(--orange-500), var(--blue-500))",
    "linear-gradient(to bottom right, var(--green-500), var(--blue-500))",
    "linear-gradient(to bottom right, var(--pink-500), var(--gray-500))",
  ];

  return (
    <>
      {errorMessage ? (
        <>
          <h4>Something Went Wrong, Please try after some time</h4>
          <MessagesCentre messageText={errorMessage} type="error" />{" "}
        </>
      ) : (
        <div className="flex flex-col justify-around bg-black">
          <div
            className="lg:h-96 h-40  w-full dark:border dark:border-white/[0.1] rounded-md relative overflow-clip top-2"
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
              className="h-[30em] overflow-y-auto flex justify-center relative  "
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
                  <div className="h-40" />
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
          </div>
          {showSuccessMessage && (
            <MessagesCentre messageText={"Login successful!"} type="success" />
          )}
        </div>
      )}
    </>
  );
};

export default Home;

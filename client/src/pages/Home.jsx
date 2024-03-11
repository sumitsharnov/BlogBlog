import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { useSelector } from "react-redux";
import MessagesCentre from "../components/MessagesCentre";
import { GoogleGeminiEffect } from "../pages/GeminiEffect";

const Home = () => {
  const { token } = useSelector((state) => state.user);
  const [content, setContent] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef(null);

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

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

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

  const backgroundColors = [
    "var(--black)",
    "var(--black)",
    "var(--black)",
  ];
  const linearGradients = [
    "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
    "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
    "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
  ];

  return (
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
          className="h-[30em] overflow-y-auto flex justify-center relative space-x-10 p-10"
          ref={ref}
        >
          <div className="div relative flex items-start px-4">
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
                      className="text-kg text-slate-300 max-w-sm mt-10"
                    >
                      {item.description}
                    </motion.p>
                  </div>
                ))}
              <div className="h-40" />
            </div>
          </div>
          <motion.div
            animate={{
              background: linearGradients[activeCard % linearGradients.length],
            }}
            className={cn(
              "hidden lg:block h-60 w-80 rounded-md bg-white sticky top-10 overflow-hidden"
            )}
          >
            <div className="flex flex-col justify-center items-center h-full">
              <img
                className="w-40 h-40"
                src={content && content[activeCard].image}
                alt="Content"
              />
              <span>{content && content[activeCard].content}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      {errorMessage && (
        <MessagesCentre messageText={errorMessage} type="error" />
      )}
    </div>
  );
};

export default Home;

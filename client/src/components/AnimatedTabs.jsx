"use client";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";
export function Tabs({ propTabs }) {
  const [active, setActive] = useState(propTabs[0]);
  const [tabs, setTabs] = useState(propTabs);
  const [hovering, setHovering] = useState(false);
  const moveSelectedTabToTop = (idx) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };
  return (
    <>
      <div
        className={cn(
          "md:flex md:flex-row items-center justify-center gap-2 [perspective:1000px] relative overflow-hidden no-visible-scrollbar max-w-full w-full flex-col p-12 mb-[5rem]"
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.name}
            onClick={() => {
              moveSelectedTabToTop(idx);
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn("relative px-2 ")} // Adjust padding for smaller screens
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active.name === tab.name && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn("absolute inset-0 bg-yellow-200 rounded-full")}
              />
            )}

            <span className="relative block text-purple-700  ">{tab.name}</span>
          </button>
        ))}
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.name}
        hovering={hovering}
        className={cn("mb-10")}
      />
    </>
  );
}

const FadeInDiv = ({ tabs, hovering }) => {
  const bgColour = useSelector((state)=>state.home.color);
  const isActive = (tab) => {
    return tab.name === tabs[0].name;
  };
  return (
    <div className="relative flex justify-between md:w-[70%] h-full w-[100%]">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.name}
          layoutId={tab.name}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : -40,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={
            window.innerWidth > 768
              ? {
                  y: isActive(tab) ? [0, 40, 0] : 0,
                }
              : null
          }
          className={cn(
            "w-full h-full absolute flex justify-center items-center "
          )}
        >
          <motion.div className="w-[100%] overflow-hidden relative h-full rounded-2xl p-5 text-xl md:text-4xl font-bold text-white flex flex-row gap-2 justify-evenly"
          animate={{background:bgColour}}
          >
            <div
              key={`${tab.value}-image`}
              className="border-2 border-white h-full min-w-[8em] md:flex hidden"
            >
              <a href={tab.image} target="_blank" rel="noopener noreferrer">
                <img className="w-full h-full" src={tab.image} alt="Image" />
              </a>
            </div>
            <div className="overflow-auto flex flex-col gap-2 justify-items-center">
              <div className="border-2 border-white]">{tab.name}</div>
              <div className="border-2 border-white] text-sm">
                {tab.overview}
              </div>
              <div className="border-2 border-white] text-sm">{tab.skills}</div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

Tabs.propTypes = {
  propTabs: PropTypes.array,
  containerClassName: PropTypes.string,
  activeTabClassName: PropTypes.string,
  tabClassName: PropTypes.string,
  contentClassName: PropTypes.string,
};

FadeInDiv.propTypes = {
  tabs: PropTypes.array.isRequired,
  hovering: PropTypes.bool.isRequired,
};

"use client";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useState } from "react";
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

  

  console.log(propTabs, active, setActive);
  return (
    <>
      <div
        className={cn(
          "md:flex md:flex-row items-center justify-start [perspective:1000px] relative overflow-hidden no-visible-scrollbar max-w-full w-full flex-col p-12"
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx);
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn("relative px-2 rounded-full")} // Adjust padding for smaller screens
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 bg-gray-200 dark:bg-zinc-800 rounded-full"
                )}
              />
            )}

            <span className="relative block text-black dark:text-white ">
              {tab.title}
            </span>
          </button>
        ))}
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn("mt-32")}
      />
    </>
  );
}

const FadeInDiv = ({ tabs, hovering }) => {
  const isActive = (tab) => {
    return tab.value === tabs[0].value;
  };
  return (
    <div className="relative flex justify-between w-[70%] h-full">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: isActive(tab) ? [0, 40, 0] : 0,
          }}
          className={cn(
            "w-full h-full absolute mt-2 flex justify-center items-center"
          )}
        >
          {tab.content}
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

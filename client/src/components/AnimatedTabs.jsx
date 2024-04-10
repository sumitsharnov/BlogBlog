"use client";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import MessagesCentre from "./MessagesCentre";
export function Tabs({
  propTabs,
  handleDownload,
  downloading,
  errorDownloading,
  downloadCount,
  downloadSuccess,
}) {
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
          "text-center [perspective:1000px] relative overflow-hidden no-visible-scrollbar max-w-full w-full "
        )}
      >
        <span className="text-3xl font-normal text-center bg-clip-text text-transparent bg-gradient-to-b from-blue-500 via-purple-500 to-red-500 flex justify-center items-center">
          Certifications
        </span>
        {errorDownloading && (
          <div className="mt-0">
            <MessagesCentre
              messageText={errorDownloading}
              type="error"
              key={downloadCount}
              top={0}
              mt={0}
            />
          </div>
        )}
        {downloadSuccess && (
          <div className="mt-0">
            <MessagesCentre
              messageText={"Download Success!"}
              type="success"
              key={downloadCount}
              top={0}
              mt={0}
            />
          </div>
        )}

        {propTabs.map((tab, idx) => (
          <button
            key={tab.name}
            onClick={() => {
              moveSelectedTabToTop(idx);
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn(
              "relative px-2 border border-purple-500 rounded-full font-semibold text-sm m-1 p-2 hover:bg-orange-200 transition duration-300 ease-in-out transform hover:scale-105"
            )} // Adjust padding for smaller screens
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active.name === tab.name && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.1, duration: 0.6 }}
                className={cn("absolute inset-0 bg-purple-400 rounded-full shadow-lg transform ")}
              />
            )}
             {active.name === tab.name ?
             <span className="relative block text-white">{tab.name}</span> :
             <span className="relative block text-black">{tab.name}</span>
             }
            
          </button>
        ))}
      </div>
      <hr className="border-orange-500 w-[90%] mx-auto sm:p-12 p-8 mt-1" />
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.name}
        hovering={hovering}
        handleDownload={handleDownload}
        downloading={downloading}
        errorDownloading={errorDownloading}
        className={cn("mb-96")}
      />
    </>
  );
}

const FadeInDiv = ({ tabs, hovering, handleDownload, downloading }) => {
  const bgColour = useSelector((state) => state.home.color);
  const isActive = (tab) => {
    return tab.name === tabs[0].name;
  };
  return (
    <div className="relative flex justify-between md:w-[70%] h-[20rem] w-[100%]">
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
            "w-full h-full absolute flex justify-center items-center"
          )}
        >
          <motion.div
            className="w-[100%] overflow-hidden relative h-full rounded-2xl p-5 text-xl md:text-4xl font-bold text-white flex flex-row gap-2 justify-evenly"
            animate={{ background: bgColour }}
          >
            <div
              key={`${tab.value}-image`}
              className="border-2 border-white rounded-lg h-full min-w-[10em] p-1 mr-2 md:flex hidden shadow-2xl"
            >
              <a href={tab.image} target="_blank" rel="noopener noreferrer">
                <img className="w-full h-full" src={tab.image} alt="Image" />
              </a>
            </div>
            <div className="overflow-auto flex flex-col gap-2 justify-centre p-2">
              <div className=" text-gray-600 text-2xl gap-2">
                <span className="mr-2 flex">{tab.name}</span>
                <a
                  href={tab.link}
                  target="_blank"
                  title={tab.link}
                  rel="noreferrer"
                >
                  <span className="text-xs  text-white border rounded-md  p-[.2rem] cursor-pointer hover:bg-gray-300 hover:text-gray-700  w-[9rem] md:inline-block text-center mr-2 mb-1">
                    Show Credentials
                  </span>
                </a>
                <div
                  onClick={handleDownload}
                  className="text-xs  text-white border rounded-md p-[.2rem] cursor-pointer hover:bg-gray-300 hover:text-gray-700  w-[7rem] flex justify-center md:inline-block text-center mt-1"
                >
                  {downloading ? (
                    <span>Downloading</span>
                  ) : (
                    <span>Download</span>
                  )}{" "}
                  <FontAwesomeIcon icon={faDownload} className="ml-2" />
                </div>
              </div>

              <span className="text-lg font-semibold text-slate-600">
                Overview:
              </span>
              <div className="text-sm font-medium font-serif">
                {tab.overview}
              </div>
              <div></div>
              <span className="text-lg font-semibold text-slate-600">
                Skills:
              </span>
              <div className="text-sm font-medium font-serif">{tab.skills}</div>
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
  handleDownload: PropTypes.func,
  downloading: PropTypes.bool,
  errorDownloading: PropTypes.bool,
  downloadCount: PropTypes.number,
  downloadSuccess: PropTypes.bool,
};

FadeInDiv.propTypes = {
  tabs: PropTypes.array.isRequired,
  hovering: PropTypes.bool.isRequired,
  handleDownload: PropTypes.func,
  downloading: PropTypes.bool,
};

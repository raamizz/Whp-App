import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Video from "./Video";
import { useSwipeable } from "react-swipeable";

const VideoFeed = ({ videos }) => {
  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);

  const swipeHandlers = useSwipeable({
    onSwipedUp: () =>
      setCurrentIndex([
        currentIndex + 1 < videos.length ? currentIndex + 1 : 0,
        1,
      ]),
    onSwipedDown: () =>
      setCurrentIndex([
        currentIndex - 1 >= 0 ? currentIndex - 1 : videos.length - 1,
        -1,
      ]),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const variants = {
    enter: (direction) => {
      return {
        y: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        y: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  return (
    <AnimatePresence initial={false} custom={direction}>
      <motion.div
        key={currentIndex}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          y: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
        style={{ position: "absolute", width: "100%", height: "100%" }}
        {...swipeHandlers}
      >
        <Video src={videos[currentIndex].src}  />
      </motion.div>
    </AnimatePresence>
  );
};

export default VideoFeed;
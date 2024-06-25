"use client";
import React, { useState, useEffect } from 'react';
import VideoFeed from "@/components/Video/VideoFeed";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useProductContext } from "@/context/ProductContext";

const VideoSlider = () => {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // State to track if the device is mobile
  const { products, fetchData } = useProductContext();

  const videos = [
    { src: '/products/GERD23021256.mp4' },
    { src: '/products/GERD23021256.mp4' },
    { src: '/products/GERD23021256.mp4' },
    { src: '/products/GERD23021256.mp4' },
    // more videos...
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleChange = (e) => {
      setIsMobile(e.matches);
    };

    // Check immediately and add listener
    setIsMobile(mediaQuery.matches);
    mediaQuery.addListener(handleChange); // For compatibility with older browsers

    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  useEffect(() => {
    fetchData();
  }, []);

  // Define the missing functions to handle modal open and close
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Conditionally render based on isMobile
  if (!isMobile) {
    return null; // Do not render anything if not on mobile
  }

  return (
    <div>
      <button onClick={handleOpenModal}><img src={"/dummy/Group_38486.png"} alt='video slider' /></button>
      {showModal && (
        <div className="modal" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <button onClick={handleCloseModal} className="fixed top-5 right-5 bg-white text-black p-2 rounded-full z-50"><Icon.X size={25} /></button>
          <VideoFeed videos={videos} products={products} />
        </div>
      )}
    </div>
  );
};

export default VideoSlider;

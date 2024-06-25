"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import VideoFeed from "@/components/Video/VideoFeed";
import { ProductType } from "@/type/ProductType";

interface PlayList {
  sequence: number;
  src: string;
}
interface Props {
  data: ProductType[];
}

// import Fade from 'react-reveal'
import { useProductContext } from "@/context/ProductContext";

const Whptv: React.FC<Props> = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // const { products, fetchData } = useProductContext();
  const [playList, setPlayList] = useState<PlayList[]>([
    { sequence: 1, src: "/images/reels/1.mp4" },
    { sequence: 2, src: "/images/reels/2.mp4" },
    { sequence: 3, src: "/images/reels/3.mp4" },
    { sequence: 4, src: "/images/reels/4.mp4" },
  ]);
  const [videos, setVideos] = useState<PlayList[]>([]);
  const [currentVideo, setCurrentVideo] = useState<PlayList | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleChange = (e: any) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addListener(handleChange);

    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const sortPlayList = useCallback(() => {
    const sortedPlayList = [...playList];
    if (currentVideo) {
      const currentVideoIndex = sortedPlayList.findIndex(
        (video) => video.sequence === currentVideo.sequence
      );
      sortedPlayList.splice(currentVideoIndex, 1);
      sortedPlayList.unshift(currentVideo);
    }
    setVideos(sortedPlayList);
  }, [currentVideo, playList]);

  useEffect(() => {
    sortPlayList();
  }, [sortPlayList]);

  const handleOpenModal = (video: PlayList) => {
    setShowModal(true);
    setCurrentVideo(video);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!isMobile) {
    return null;
  }

  return (
    <>
      <div className="collection-block md:pt-20 pt-10">
        <div className="flex flex-col justify-between text-red-950 gap-8 px-8">
          <h1 className="text-5xl">
            Shop with <br /> WHP TV
          </h1>
          <p className="font-medium text-gray-700">
            Elevate your day with our exquisite jewelry, perfect for any
            occasion. Find the piece that speaks to your style and story.
          </p>
        </div>
        <div className="list-collection section-swiper-navigation md:mt-10 mt-6 sm:px-5 px-4">
          <Swiper
            spaceBetween={12}
            slidesPerView={2}
            loop={true}
            modules={[Navigation, Autoplay]}
            breakpoints={{
              576: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            className="h-full"
          >
            {playList.map((video, index) => (
              <SwiperSlide key={index}>
                <div
                  className="collection-item block relative overflow-hidden cursor-pointer"
                  onClick={() => handleOpenModal(video)}
                >
                  <div className="bg-img">
                    <Image
                      src={`/images/reels/${video.sequence}.jpg`}
                      width={1000}
                      height={600}
                      alt=""
                    />
                  </div>
                  <div className="collection-name bg-[#f7f7ff7] heading7 text-center sm:bottom-8  lg:w-[150px] md:w-[160px] w-[100px] md:py-3 py-1.5 duration-500">
                    <span className="flex justify-center">
                      <span>Watch</span>
                      <span className="">
                        <Icon.Play weight="fill" color="#e26178" size={20} />
                      </span>
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {showModal && (
          <div
            className="modal"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              zIndex: 1000,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              onClick={handleCloseModal}
              className="fixed top-5 right-5 bg-white text-black p-2 rounded-full z-50"
            >
              <Icon.X size={25} />
            </button>
            <VideoFeed videos={videos} />
          </div>
        )}
      </div>
    </>
  );
};

export default Whptv;

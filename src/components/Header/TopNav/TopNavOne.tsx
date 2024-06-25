"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/effect-fade";

interface Props {
  textColor: string;
}

const TopNavOne: React.FC<Props> = ({ textColor }) => {
  return (
    <div
      className={`banner-top style-four w-full bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] md:h-[25px] h-[32px]`}
    >
      <div className="container flex items-center justify-center h-full">
        <div className="flex justify-center items-center w-full h-full">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            modules={[Autoplay, Navigation]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="h-full w-full"
          >
            <SwiperSlide>
              <div
                className={`text-button-uppercase text-white ${textColor} flex items-center justify-center h-full`}
              >
                Welcome to WHP Jewellers
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className={`text-button-uppercase text-white ${textColor} flex items-center justify-center h-full`}
              >
                Something Special For Everyone
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className={`text-button-uppercase text-white ${textColor} flex items-center justify-center h-full`}
              >
                10% off on all products
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default TopNavOne;

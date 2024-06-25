"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useRouter } from "next/navigation";
// import Fade from 'react-reveal'

const SpecialOccasion = () => {
  const router = useRouter();

  const handleTypeClick = (type: string) => {
    router.push(`/products?type=${type}`);
  };

  return (
    <>
      <div className="collection-block md:pt-10 pt-10">
        {/* <div className="container"> */}
        {/* <Fade bottom> */}
        {/* <div className="heading3 text-center">Special Occasion</div> */}
        <div className="flex flex-col justify-between text-red-950 gap-8 px-8">
          <h1 className="lg:text-5xl md:text-3xl text-2xl ">
            Something special for <br/> Every Occasion
          </h1>
          <p className="font-medium text-gray-700">
            Crafted to add a touch of elegance and charm to every occasion. From
            celebrations to <br />
            cherished milestones, find the perfect piece that speaks to your
            unique style and sentiments.
          </p>
        </div>
        {/* </Fade> */}
        {/* </div> */}
        <div className="list-collection section-swiper-navigation md:mt-10 mt-6 sm:px-5 px-4">
          <Swiper
            spaceBetween={12}
            slidesPerView={1.5}
            // navigation
            modules={[Navigation, Autoplay]}
            breakpoints={{
              576: {
                slidesPerView: 1.5,
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
            <SwiperSlide>
              <div
                className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => handleTypeClick("")}
              >
                <div className="bg-img">
                  <Image
                    src={"/images/other/Occassion1.png"}
                    width={1000}
                    height={600}
                    alt=""
                  />
                </div>
                <div className="collection-name heading7 text-center sm:bottom-8  lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-transparent rounded-xl duration-500">
                  Swarnak
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => handleTypeClick("top")}
              >
                <div className="bg-img">
                  <Image
                    src={"/images/other/Occassion2.png"}
                    width={1000}
                    height={600}
                    alt=""
                  />
                </div>
                <div className="collection-name heading7 sm:heading-8 text-center sm:bottom-8  lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-transparent rounded-xl duration-500">
                  Wedding Collections
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => handleTypeClick("sets")}
              >
                <div className="bg-img">
                  <Image
                    src={"/images/other/Occassion3.png"}
                    width={1000}
                    height={600}
                    alt=""
                  />
                </div>
                <div className="collection-name heading7 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-transparent rounded-xl duration-500">
                  Self Gifting Treasure
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => handleTypeClick("outerwear")}
              >
                <div className="bg-img">
                  <Image
                    src={"/images/other/Occassion4.png"}
                    width={1000}
                    height={600}
                    alt=""
                  />
                </div>
                <div className="collection-name heading7 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-transparent rounded-xl duration-500">
                  9Ratna Gemstones
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => handleTypeClick("underwear")}
              >
                <div className="bg-img">
                  <Image
                    src={"/images/other/Occassion2.png"}
                    width={1000}
                    height={600}
                    alt=""
                  />
                </div>
                <div className="collection-name heading7 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-transparent rounded-xl duration-500">
                  Wedding Collection{" "}
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => handleTypeClick("t-shirt")}
              >
                <div className="bg-img">
                  <Image
                    src={"/images/other/Occassion3.png"}
                    width={1000}
                    height={600}
                    alt="gift"
                  />
                </div>
                <div className="collection-name heading7 sm:heading-8 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-transparent rounded-xl duration-500">
                  Self Gifting Treasure
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default SpecialOccasion;

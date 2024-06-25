"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Slider from "react-slick";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from "swiper/react";

const RoseGold = () => {
  const [width, setWidth] = useState<number>(300);
  const [height, setHeight] = useState<number>(200);
  const [bannerwidth, setBannerWidth] = useState<number>(300);
  const [bannerheight, setBannerHeight] = useState<number>(200);

  useEffect(() => {
    const handleResize = () => {
      // Get the current viewport width
      const viewportWidth = window.innerWidth;

      if (viewportWidth < 768) {
        // Small screens
        setWidth(135);
        setHeight(43);
        setBannerWidth(170);
        setBannerHeight(298);
      } else if (viewportWidth >= 768 && viewportWidth < 1024) {
        // Medium screens
        setWidth(170);
        setHeight(50);
        setBannerWidth(220);
        setBannerHeight(390);
      } else {
        // Large screens
        setWidth(290);
        setHeight(200);
        setBannerWidth(350);
        setBannerHeight(465);
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="flex flex-wrap p-5 bg-[#f7f5f6] mt-5 justify-between">
      <div className="lg:w-[30%] mr-6 md:w-[40%]">
        <p className="max-sm:text-center md:mb-3 font-semibold">Explore</p>
        <p className="lg:text-4xl max-sm:text-[1.5rem] max-sm:text-center lg:text-start lg:leading-[50px] sm:leading-4 md:text-[1.5rem] md:mb-3">
          ROSE GOLD RANGE
        </p>
        <div className="lg:text-start lg:text-[1rem] max-sm:text-center md:text-[0.5rem] max-sm:text-xs">
          <p>
            Elevate your style with the warm, rosy embrace of rose gold
            jewellery. Its timeless elegance adds a touch of sophistication to
            every look.
          </p>
        </div>
        <div className="flex mt-7 max-sm:justify-center mb-5 ">
          <div className="mr-2 cursor-pointer">
            <Image
              src={"/images/roseGoldImages/roseGoldVariants1.png"}
              alt={"roseGoldVariants"}
              width={40}
              height={40}
            />
          </div>
          <div className="mr-2 cursor-pointer">
            <Image
              src={"/images/roseGoldImages/roseGoldVariants2.png"}
              alt={"roseGoldVariants"}
              width={40}
              height={40}
            />
          </div>
          <div className="mr-2 cursor-pointer">
            <Image
              src={"/images/roseGoldImages/roseGoldVariants3.png"}
              alt={"roseGoldVariants"}
              width={40}
              height={40}
            />
          </div>
        </div>
        {width > 135 && (
          <Link href={{ pathname: "/products", query: { url: "c-rose_gold" } }}>
            <div className="flex justify-normal mt-auto flex-end">
              <span className="flex justify-center bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] lg:w-[60%]  px-6 py-2 text-white">
                Shop All
                <span className="mt-1 ml-2">
                  <Icon.ArrowRight />
                </span>
              </span>
            </div>
          </Link>
        )}
      </div>
      <div className="flex sm:justify-center max-sm:justify-center max-sm:w-full">
        <Image
          src={"/images/roseGoldImages/roseGoldRingBanner.png"}
          width={bannerwidth}
          height={height}
          alt={"the rose gold section"}
        />

        <Image
          src={"/images/roseGoldImages/roseGoldRingBannerWithHand.png"}
          width={width}
          height={height}
          alt={"the rose gold section"}
        />
      </div>
      {width < 170 && (
        <div className="flex justify-center w-full mt-5">
          <Link href={{ pathname: "/products", query: { url: "c-rose_gold" } }}>
            <span className="flex justify-center bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] lg:w-[37%] px-6 py-2 text-white">
              Shop All
              <span className="mt-1 ml-2">
                <Icon.ArrowRight />
              </span>
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RoseGold;

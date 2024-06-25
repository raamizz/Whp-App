"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const WhpApp = () => {
  const [width, setWidth] = useState<number>(300);
  const [height, setHeight] = useState<number>(200);
  const [bannerwidth, setBannerWidth] = useState<number>(300);
  const divRef = useRef<any>(null);
  const [bannerheight, setBannerHeight] = useState<number>(200);

  useEffect(() => {
    const handleResize = () => {
      // Get the current viewport width
      const viewportWidth = window.innerWidth;

      if (viewportWidth < 768) {
        // Small screens
        setWidth(145);
        setHeight(43);
        setBannerWidth(255);
        setBannerHeight(298);
      } else if (viewportWidth >= 768 && viewportWidth < 1024) {
        // Medium screens
        setWidth(180);
        setHeight(50);
        setBannerWidth(300);
        setBannerHeight(390);
      } else {
        // Large screens
        setWidth(225);
        setHeight(65);
        setBannerWidth(397);
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
    <>
      <div
        className="flex flex-wrap justify-center bg-[#f7f5f6] pt-4"
        ref={divRef}
      >
        <div className="lg:w-[50%] sm:w-[100%] md:w-[50%]">
          {width < 180 ? (
            <p className="text-center text-2xl font-semibold">
              Download the WHP App
            </p>
          ) : (
            <p className="lg:text-[3rem] md:text-[2rem] text-start font-semibold leading-10 lg:text-start md:text-center">
              Download the Waman Hari Pethe App
            </p>
          )}
          <p className="lg:w-[70%] sm:w-[100%] mt-4 md:text-center lg:text-start max-md:text-center max-sm:px-3">
            Now you can explore the timeless glamour of Waman Hari Pethe
            whenever you want! Shining new app, made just for you! It's Free,
            Easy & Smart.
          </p>
          <div className="flex max-sm:justify-center lg:justify-start  md:justify-start mt-5 mb-5">
            <div className=" mr-4">
              <Image
                src={"/dummy/appStoreButton.png"}
                alt={"the download app button"}
                width={width}
                height={height}
              />
            </div>
            <div>
              <Image
                src={"/dummy/playStoreButton.png"}
                alt={"the download app button"}
                width={width}
                height={height}
              />
            </div>
          </div>
        </div>
        <div>
          <Image
            src={"/dummy/mobileAppBanner.png"}
            alt="Download WHP App From Play Store or App Store"
            width={bannerwidth}
            height={bannerheight}
          />
        </div>
      </div>
    </>
  );
};

export default WhpApp;

"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const WhatWeOffer = () => {
  const [width, setWidth] = useState<number>(300);
  const [height, setHeight] = useState<number>(200);

  useEffect(() => {
    const handleResize = () => {
      // Get the current viewport width
      const viewportWidth = window.innerWidth;

      if (viewportWidth < 768) {
        // Small screens
        setWidth(130);
        setHeight(43);
      } else if (viewportWidth >= 768 && viewportWidth < 1024) {
        // Medium screens
        setWidth(170);
        setHeight(50);
      } else {
        // Large screens
        setWidth(290);
        setHeight(200);
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
      <div className="bg-[#F9F5F5] text-[#39161C] mt-4">
        {width < 140 && (
          <div className="p-4 mt-5">
            <p className="font-medium tracking-[0.49rem] text-center w-full">
              OFFERINGS
            </p>
            <div className="w-full text-center font-semibold text-xl mt-4">
              What We Offer
            </div>
            <div className="m-auto text-center w-[80%] mb-5 mt-3 ">
              Discover our offerings. Our commitment to quality, elegance, and
              personalised service ensures an exceptional experience.
            </div>
          </div>
        )}
        <div className="flex flex-wrap lg:flex-row">
          <div className="lg:w-[50%] max-sm:w-full md:w-[50%]">
            <Image
              src={"/images/other/whatweoffer.png"}
              className="w-full h-auto"
              alt="What We Offer"
              width={width}
              height={height}
            />
          </div>
          <div className="w-full flex flex-col sm:w-[50%] md:p-4 md:mt-2 sm:p-[4rem]">
            {width > 160 && (
              <div className="ps-3 pt-3">
                <p className="lg:text-[3rem] text-[2rem] pb-5">What We Offer</p>
                <p className="text-sm md:text-base">
                  Discover our offerings. Our commitment to quality, elegance,
                  and personalised service ensures an exceptional experience.
                </p>
              </div>
            )}
            <div className="mt-auto flex-end order-1">
              <div className="flex justify-between max-sm:text-center">
                <div className="py-4">
                  <Image
                    src={"/images/icons/star.svg"}
                    alt="Star"
                    width={40}
                    height={40}
                    className={`${width < 140 && "m-auto"}`}
                  />
                  <p className="font-semibold text-lg md:text-xl pt-3 pb-2">
                    12000 + UNIQUE DESIGNS
                  </p>
                  <p className="text-sm md:text-base">
                    Elevate your style with our distinctive jewellery designs,
                    where creativity and craftsmanship unite.
                  </p>
                  <Link
                    href={{
                      pathname: "/products",
                      query: { url: "c-new_Arrival" },
                    }}
                    className="inline-flex items-center"
                  >
                    <span className=" me-2 text-[#E26178] underline cursor-pointer text-sm">
                      Next
                    </span>
                    <span className="flex items-center">
                      <Image
                        src={"/images/icons/rightarrow.svg"}
                        alt="Right Arrow"
                        width={20}
                        height={20}
                      />
                    </span>
                  </Link>
                </div>
                <div className="hidden sm:block">
                  <p
                    className="font-semibold text-lg tracking-[0.49rem]"
                    style={{
                      textOrientation: "mixed",
                      writingMode: "vertical-lr",
                      transform: "rotate(180deg)",
                    }}
                  >
                    OFFERINGS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatWeOffer;

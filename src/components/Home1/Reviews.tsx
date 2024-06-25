"use client";

import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { ArrowRight, ArrowLeft } from "@phosphor-icons/react";
import Image from "next/image";

interface Testimonial {
  content: string;
  author: string;
}

const TestimonialData: Testimonial[] = [
  {
    content:
      "WHP is a great shop for jewellery purchases not only is this shop located at prime destination but it also has a large premise making it easy for the customers to move across the various options of jewellery. If one thing I should tell you is that the gold quality of Waman Hari Pethe is excellent",
    author: "Amrutha Joshi",
  },
  {
    content:
      "WHP is a great shop for jewellery purchases not only is this shop located at prime destination but it also has a large premise making it easy for the customers to move across the various options of jewellery. If one thing I should tell you is that the gold quality of Waman Hari Pethe is excellent",
    author: "Christian Bale",
  },
  {
    content:
      "WHP is a great shop for jewellery purchases not only is this shop located at prime destination but it also has a large premise making it easy for the customers to move across the various options of jewellery. If one thing I should tell you is that the gold quality of Waman Hari Pethe is excellent",
    author: "Ryan Gosling",
  },
  {
    content:
      "WHP is a great shop for jewellery purchases not only is this shop located at prime destination but it also has a large premise making it easy for the customers to move across the various options of jewellery. If one thing I should tell you is that the gold quality of Waman Hari Pethe is excellent",
    author: "Christian Bale",
  },
];

const Reviews: React.FC = () => {
  const sliderRef = useRef<Slider>(null);

  const CustomPrevArrow: React.FC<{ onClick: () => void }> = (props) => (
    <div className="custom-arrow prev" onClick={props.onClick}>
      <ArrowLeft size={26} />
    </div>
  );

  const CustomNextArrow: React.FC<{ onClick: () => void }> = (props) => (
    <div className="custom-arrow next" onClick={props.onClick}>
      <ArrowRight size={26} />
    </div>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    prevArrow: (
      <CustomPrevArrow onClick={() => sliderRef.current?.slickPrev()} />
    ),
    nextArrow: (
      <CustomNextArrow onClick={() => sliderRef.current?.slickNext()} />
    ),
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center md:mb-16 mt-28 pl-8">
        <div className="w-full md:w-[40%] flex flex-col items-start">
          <h2 className="font-semibold text-[1.5rem] uppercase mb-5">
            TESTIMONIALS
          </h2>
          <div className="flex w-100 justify-between pe-2  md:block md:w-auto">
            <h1 className="text-2xl md:text-5xl mb-8 text-red-950">
              Hear from our <br /> customers
            </h1>
            <div className="hidden md:flex -space-x-4 rtl:space-x-reverse mb-8">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="w-20 h-20 border-2 border-gray-300 rounded-full overflow-hidden"
                >
                  <Image
                    src="/images/other/userimage.jpg"
                    alt="User"
                    width={80}
                    height={80}
                  />
                </div>
              ))}
              {/* <a
              className="flex items-center justify-center w-20 h-20 text-xs font-medium text-white bg-gray-700 border-2 border-gray-300 rounded-full hover:bg-gray-600"
              href="#"
            >
              +99
            </a> */}
            </div>
            <div className="flex items-center gap-8 cursor-pointer">
              <CustomPrevArrow onClick={() => sliderRef.current?.slickPrev()} />
              <CustomNextArrow onClick={() => sliderRef.current?.slickNext()} />
            </div>
          </div>
        </div>
        <div className="w-full md:w-[60%] m-0 md:mt-8 items-center h-full">
          <Slider {...settings} ref={sliderRef}>
            {TestimonialData.map((testimonial, index) => (
              <div key={index} className="p-2">
                <div className="bg-white border border-gray-200 flex flex-col h-full p-4 text-red-950">
                  <p className="text-sm mb-32">{testimonial.content}</p>
                  <h1 className="text-lg font-bold">{testimonial.author}</h1>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Reviews;

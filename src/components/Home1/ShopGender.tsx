"use client";

import React, { useRef, useState, useEffect } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useCategory } from "@/context/CategoryContex";
const ShopGender = () => {
  const { setCustomcategory } = useCategory();
  const swiperRef = useRef<any>();
  let categories = [
    {
      id: 1,
      url: "g-women",
      categoryUrl: "Women",
      type: "WOMEN'S JEWELLERY",
      description: "Earrings, Pendants, Bracelets and more",
      image: (
        <Image
          src={"/images/other/WomensGender.jpg"}
          alt="womengender"
          width={500}
          height={500}
        />
      ),
    },
    {
      id: 2,
      url: "g-men",
      categoryUrl: "Men",
      type: "MEN'S JEWELLERY",

      description: "Bracelets, Chains, Rings and more",
      image: (
        <Image
          src={"/images/other/MensGender.jpg"}
          alt="mensgender"
          width={500}
          height={1000}
        />
      ),
    },
    {
      id: 3,
      url: "g-kids",
      categoryUrl: "Kids",
      type: "KID'S JEWELLERY",
      description: "Anklets, Earrings, Bracelets and more",
      image: (
        <Image
          src={"/images/other/KidsGender.jpg"}
          alt="kidsgender"
          width={500}
          height={1000}
        />
      ),
    },
  ];

  return (
    <>
      <div className="w-full px-7 mt-8 font-[500] text-[#39161C] mb-9">
        <div className="flex justify-between">
          <div>
            <p className="font-semibold text-[1.5rem] uppercase">
              Shop by gender
            </p>
          </div>
          <div className="flex">
            <button onClick={() => swiperRef.current.slidePrev()}>
              <Icon.CaretLeft size={30} />
            </button>
            <button onClick={() => swiperRef.current.slideNext()}>
              <Icon.CaretRight size={30} />
            </button>
          </div>
        </div>
        <div className="list-product hide-product-sold section-swiper-navigation style-outline style-border ">
          <Swiper
            spaceBetween={12}
            slidesPerView={1.5}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            loop={true}
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
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
          >
            {categories.map((category) => (
              <SwiperSlide
                key={category.id}
                className="flex flex-col gap-2 relative items-center blurcontainer"
              >
                <Link
                  href={`/products?url=${category.url}`}
                  className="h-[80%]"
                  onClick={() => setCustomcategory(category.categoryUrl)}
                >
                  <div className="md:rounded-[60px]  max-lg:rounded-[40px] overflow-hidden bg ">
                    {category.image}
                    <div className="overlay">
                      <p className="xs:text-lg md:text-2xl text-center">
                        {category.type}
                      </p>
                    </div>
                  </div>
                </Link>
                <h1 className="lg:text-xl md:text-lg font-semibold">{category.type}</h1>
                <p className="text-sm ">{category.description}</p>
                <Link
                  className="inline-flex items-center"
                  href={`/products?url=${category.url}`}
                  onClick={() => setCustomcategory(category.categoryUrl)}
                >
                  <span className="me-2 text-[#E26178] underline cursor-pointer text-sm">
                    View All
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ShopGender;

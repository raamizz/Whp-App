"use client";

import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import DummyProduct from "../Other/DummyProduct";
import { ProductType } from "@/type/ProductType";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { baseUrl } from "@/utils/constants";
import Cookies from "js-cookie";

const ProductSlider = () => {
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const swiperRef = useRef<any>();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const cookieToken = localStorage.getItem("localtoken");

      const response = await axios.get(`${baseUrl}/buyAgain`, {
        headers: { Authorization: `Bearer ${cookieToken}` },
      });
      setProducts(response.data);
      setLoading(false);
    };
    fetchProduct();
  }, []);

  const filteredProducts = products;

  return (
    <>
      {products.length > 0 && (
        <div className="tab-features-block pt-10">
          <div className="container">
            {products.length > 0 && (
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold text-[1.5rem] uppercase">
                    Buy Again
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
            )}
            {loading ? (
              <Swiper
                spaceBetween={12}
                slidesPerView={1.5}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                loop={true}
                className="flex"
                modules={[Navigation, Autoplay]}
                zoom
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
                    spaceBetween: 30,
                  },
                }}
              >
                <SwiperSlide className="mr-4 ">
                  <Skeleton height={300} width={200} />
                </SwiperSlide>
                <SwiperSlide className="mr-4 ">
                  <Skeleton height={300} width={200} />
                </SwiperSlide>
                <SwiperSlide className="mr-4">
                  <Skeleton height={300} width={200} />
                </SwiperSlide>
                <SwiperSlide className="mr-4">
                  <Skeleton height={300} width={200} />
                </SwiperSlide>
              </Swiper>
            ) : (
              <div className="list-product hide-product-sold section-swiper-navigation style-outline style-border md:mt-10 mt-6 ">
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
                      slidesPerView: 4,
                      spaceBetween: 30,
                    },
                  }}
                >
                  {filteredProducts.map((prd: any, index: any) => (
                    <SwiperSlide key={index}>
                      <DummyProduct data={prd} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductSlider;

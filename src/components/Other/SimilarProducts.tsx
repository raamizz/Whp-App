"use client";

import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import DummyProduct from "../Other/DummyProduct";
import { ProductType } from "@/type/ProductType";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import axios from "axios";
import { baseUrl } from "@/utils/constants";
import Cookies from "js-cookie";

interface Props {
  productId: number;
}

const SimilarProducts: React.FC<Props> = ({ productId }) => {
  const [products, setProducts] = useState<any>([]);
  const swiperRef = useRef<any>();
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(
        `${baseUrl}/similar-products/${productId}`
      );
      setProducts(response.data);
    };
    fetchProduct();
  }, [productId]);
  const filteredProducts = products;
  return (
    <>
      <div className="tab-features-block pt-10">
        <div className="container">
          <div className="flex justify-between">
            {products.length>0 && (
              <>
                <div>
                  <p className="font-bold text-[1.5rem]">
                    View Similar Products
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
              </>
            )}
          </div>

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
              {filteredProducts
                .map((prd: any, index: any) => (
                  <SwiperSlide key={index}>
                    <DummyProduct data={prd} />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default SimilarProducts;

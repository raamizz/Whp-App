"use client";
import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Zoom } from "swiper/modules";
import "swiper/css/bundle";
import DummyProduct from "../Other/DummyProduct";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import axios from "axios";
import { baseUrl } from "@/utils/constants";

const GetFastDeliveryProducts = () => {
  const swiperRef = useRef<any>();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const client = new ApolloClient({
          // uri: "http://localhost:8080/",
          uri: "https://seashell-app-kswll.ondigitalocean.app/",
          cache: new InMemoryCache(),
        });

        const FAST_DELIVERY_QUERY = gql`
  query FastDelivery {
    fastDelivery {
      productId
      url
      title
      productPrice
      discountPrice
      typeOfDiscount
      discountValue
      rating
      imageDetails {
        image_path
      }
      videoDetails {
        video_path
      }
    }
  }
`;
        const { data } = await client.query({
          query: FAST_DELIVERY_QUERY,
        });
        // const response = await axios.get(`${baseUrl}/fast-delivery`);
        setData(await data.fastDelivery);
      } catch (error) {
        console.log();
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <>
      <div className="tab-features-block pt-4">
        <div className="container">
          <div className="flex justify-between">
            <div>
              <p className="font-semibold text-[1.5rem] uppercase">GET IN 24-48 HRS</p>
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
          {loading ? (
            <Swiper
              spaceBetween={12}
              slidesPerView={1.5}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              loop={true}
              className="flex"
              modules={[Navigation, Autoplay, Zoom]}
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
            <div className="list-product  hide-product-sold section-swiper-navigation style-outline style-border md:mt-10 mt-6 ">
              <Swiper
                spaceBetween={12}
                slidesPerView={1.5}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                loop={true}
                modules={[Navigation, Autoplay, Zoom]}
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
                {Array.isArray(data) &&
                  data.map((prd: any, index: any) => (
                    <SwiperSlide key={index}>
                      <DummyProduct data={prd} />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GetFastDeliveryProducts;

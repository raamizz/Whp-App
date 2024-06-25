import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import StickyNav from "../Header/StickyNav";

const dummyData = [
  {
    image: (
      <Image
        src={"/images/offers/icon_gold.png"}
        alt={"Gold Icon"}
        width={80}
        height={80}
      />
    ),
    title: "Gold",
  },
  {
    image: (
      <Image
        src={"/images/offers/icon_gemstone.png"}
        alt={"Icon Gemstone"}
        width={80}
        height={80}
      />
    ),
    title: "Gemstones",
  },
  {
    image: (
      <Image
        src={"/images/offers/icon_coin.png"}
        alt={"Icon Coin"}
        width={80}
        height={80}
      />
    ),
    title: "Coin",
  },
  {
    image: (
      <Image
        src={"/images/offers/icon_women.png"}
        alt={"Icon Women"}
        width={80}
        height={80}
      />
    ),
    title: "Women",
  },
  {
    image: (
      <Image
        src={"/images/offers/icon_men.png"}
        alt={"Icon Men"}
        width={80}
        height={80}
      />
    ),
    title: "Men",
  },
  {
    image: (
      <Image
        src={"/images/offers/icon_festive.png"}
        alt={"Icon Festive"}
        width={80}
        height={80}
      />
    ),
    title: "Festive",
  },
  {
    image: (
      <Image
        src={"/images/offers/icon_card.png"}
        alt={"Icon Cards"}
        width={80}
        height={80}
      />
    ),
    title: "Cards",
  },
];
const OfferBanners = [
  "/images/offers/banner_1_offer.png",
  "/images/offers/banner_2_offer.png",
  "/images/offers/banner_3_offer.png",
  "/images/offers/banner_4_offer.png",
  "/images/offers/banner_1_offer.png",
  "/images/offers/banner_2_offer.png",
  "/images/offers/banner_1_offer.png",
  "/images/offers/banner_2_offer.png",
  "/images/offers/banner_3_offer.png",
];
const Offers = () => {
  return (
    <>
    <StickyNav/>
    <div className="p-6">
      <div className="lg:w-[50%] md:w-[60%] ">
        <p className="text-2xl font-semibold">OFFERS</p>
        <p>
          Indulge in exclusive offers. Unlock savings and special perks that
          make your experience with us even more memorable.
        </p>
      </div>
      <div className="mt-4">
        <Swiper
          slidesPerView={3.5}
          spaceBetween={10}
          breakpoints={{
            768: {
              slidesPerView: 6.5,
              spaceBetween: 20,
            },
          }}
        >
          {dummyData.map((data, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col justify-center items-center">
                <div>{data.image}</div>
                <p className="text-center">{data.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-8 mt-5">
        {OfferBanners.map((images, index) => (
          <div key={index}>
            <Image
              src={images}
              alt={"the offer banner"}
              width={400}
              height={400}
            />
          </div>
        ))}
      </div>
    </div></>
  );
};

export default Offers;

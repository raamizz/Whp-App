"use client";
import React from "react";
import ProductSlider from "@/components/Home1/ProductSlider";
import MobileMainCategorySwiper from "@/components/Home1/MobileMainCategorySwiper";
import MainCarousel from "@/components/Slider/MainCarousel";
import Explore from "@/components/Home1/Explore";
import BuyAgain from "@/components/Home1/BuyAgain";
import Category from "@/components/Home1/Category";
import RoseGold from "@/components/Home1/RoseGold";
import GoldScheme from "@/components/Home1/GoldScheme";
import ShopGender from "@/components/Home1/ShopGender";
import Appointment from "@/components/Home1/Appointment";
import Gifts from "@/components/Home1/Gifts";
import PreciousGems from "@/components/Home1/PreciousGems";
import SpecialOccasion from "@/components/Home1/SpecialOccasion";
import Reviews from "@/components/Home1/Reviews";
import WhpTv from "@/components/Home1/WhpTv";
import WhpApp from "@/components/Home1/WhpApp";
import { useProductContext } from "@/context/ProductContext";
import GetFastDeliveryProducts from "@/components/Home1/GetFastDeliveryProducts";
import WhatWeOffer from "@/components/Home1/WhatWeOffer";
import StickyNav from "@/components/Header/StickyNav";

import Head from "next/head";

export default function Home() {
  const { products } = useProductContext();

  let logged = null;
  if (typeof window !== "undefined") {
    logged = localStorage.getItem("isLoggedIn");
  }
  const heatmapData = [
    { x: 100, y: 150, value: 50 },
    { x: 200, y: 250, value: 60 },
    { x: 300, y: 350, value: 70 },
    { x: 300, y: 2550, value: 70 },
  ];
  return (
    <>
      {/* <Head>
        <title>Home - WHP Web</title>
        <meta
          name="description"
          content="Welcome to WHP Web, your one-stop destination for exquisite jewelry and much more."
        />
      </Head> */}
      <div className="overflow-x-hidden">
        <MobileMainCategorySwiper />
        <MainCarousel />
        <Explore />
        {/* <Collection /> */}
        <ProductSlider />
        {logged === "true" && <BuyAgain />}
        <WhpTv products={products} />
        <RoseGold />
        <Category />
        <GetFastDeliveryProducts />
        <WhatWeOffer />
        <ShopGender />
        {/* <PreciousGems /> */}
        <Appointment />
        <Gifts />
        <GoldScheme />
        <SpecialOccasion />
        <Reviews />
        {/* <WhpApp /> */}
      </div>
      {/* <WhpApp /> */}
      <StickyNav />
    </>
  );
}

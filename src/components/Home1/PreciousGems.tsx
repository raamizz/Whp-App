import React from "react";
import Image from "next/image";


const PreciousGems = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 h-96 lg:h-auto relative">
          <Image
            src={"/images/other/GemStone.jpg"}
            width={1000}
            height={400}
            alt="gemstones"
            className="object-fill w-full h-full"
          />
        </div>
        <div className="w-full h-full lg:w-1/2 lg:h-auto text-red-950">
          <div className="flex flex-col justify-center h-full py-10 px-4 gap-5">
            <h2 className="font-semibold text-lg text-red-950">
              Precious Gemstones
            </h2>
            <h1 className="text-5xl font-medium mb-5">
              9Ratna, Unearth the elegant Radiance
            </h1>
            <p className="font-medium mb-5">
              Discover the allure of gemstone jewellery, where nature`s vibrant
              palette meets exquisite craftsmanship. Each piece tells a story,
              adding a touch of color to your style.
            </p>
            <div className="flex gap-3">
              <Image
                src={"/images/other/GemStone1.png"}
                width={100}
                height={200}
                className="object-cover rounded-[50px]"
                alt="gemtype"
              />
              <Image
                src={"/images/other/GemStone2.png"}
                width={100}
                height={200}
                className="object-cover rounded-[50px]"
                alt="gemtype"
              />
              <Image
                src={"/images/other/GemStone3.png"}
                width={100}
                height={200}
                className="object-cover rounded-[50px]"
                alt="gemtype"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreciousGems;

import React from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";

const page = () => {
  return (
    <div className="p-4">
      <div>
        <p className="uppercase text-3xl">locate whp stores</p>
      </div>
      <div className="flex justify-between">
        <div>
          <p className="w-[55%]">
            Explore our jewellery stores across multiple locations for exquisite
            pieces and personalised service, wherever you are.
          </p>
        </div>
        <div className="flex justify-between bg-[#f7f7f7]">
          <input
            placeholder="Search"
            className="focus:outline-none bg-[#f7f7f7]"
          />
          <div className="flex items-center">
            <Icon.MagnifyingGlass size={25} />
          </div>
        </div>
      </div>
      <div className="flex shadow-xl my-4">
        <div className=" flex flex-col justify-center w-[50%] h-[380px] scrollbar-thin overflow-y-auto p-3">
          <div className="w-[50%] border mb-4 p-3">
            <p>Vashi Sector - 17</p>
            <p>
              Big Splash Complex, Vashi-Turbhe Rd, Sector 17, Vashi, Navi
              Mumbai, Maharashtra 400703
            </p>
            <span className="flex">
              <Icon.PhoneCall />
              <p>02227668400</p>
            </span>
            <span className="flex items-center">
              <Icon.PhoneCall />
              <p>Sun - Sat - 10:30 AM tp 8 PM</p>
            </span>
            <span className="flex items-center text-[#e26178]">
              <p>Sun - Sat - 10:30 AM tp 8 PM</p>
              <Icon.ArrowRight />
            </span>
          </div>
          <div className="w-[50%] border mb-4 p-3">
            <p>Vashi Sector - 17</p>
            <p>
              Big Splash Complex, Vashi-Turbhe Rd, Sector 17, Vashi, Navi
              Mumbai, Maharashtra 400703
            </p>
            <span className="flex">
              <Icon.PhoneCall />
              <p>02227668400</p>
            </span>
            <span className="flex items-center">
              <Icon.PhoneCall />
              <p>Sun - Sat - 10:30 AM tp 8 PM</p>
            </span>
          </div>
          <div className="w-[50%] border mb-4 p-3">
            <p>Vashi Sector - 17</p>
            <p>
              Big Splash Complex, Vashi-Turbhe Rd, Sector 17, Vashi, Navi
              Mumbai, Maharashtra 400703
            </p>
            <span className="flex">
              <Icon.PhoneCall />
              <p>02227668400</p>
            </span>
            <span className="flex items-center">
              <Icon.PhoneCall />
              <p>Sun - Sat - 10:30 AM tp 8 PM</p>
            </span>
          </div>
          <div className="w-[50%] border mb-4 p-3">
            <p>Vashi Sector - 17</p>
            <p>
              Big Splash Complex, Vashi-Turbhe Rd, Sector 17, Vashi, Navi
              Mumbai, Maharashtra 400703
            </p>
            <span className="flex">
              <Icon.PhoneCall />
              <p>02227668400</p>
            </span>
            <span className="flex items-center">
              <Icon.PhoneCall />
              <p>Sun - Sat - 10:30 AM tp 8 PM</p>
            </span>
          </div>
          <div className="w-[50%] border mb-4 p-3">
            <p>Vashi Sector - 17</p>
            <p>
              Big Splash Complex, Vashi-Turbhe Rd, Sector 17, Vashi, Navi
              Mumbai, Maharashtra 400703
            </p>
            <span className="flex">
              <Icon.PhoneCall />
              <p>02227668400</p>
            </span>
            <span className="flex items-center">
              <Icon.PhoneCall />
              <p>Sun - Sat - 10:30 AM tp 8 PM</p>
            </span>
          </div>
          <div className="w-[50%] border mb-4 p-3">
            <p>Vashi Sector - 17</p>
            <p>
              Big Splash Complex, Vashi-Turbhe Rd, Sector 17, Vashi, Navi
              Mumbai, Maharashtra 400703
            </p>
            <span className="flex">
              <Icon.PhoneCall />
              <p>02227668400</p>
            </span>
            <span className="flex items-center">
              <Icon.PhoneCall />
              <p>Sun - Sat - 10:30 AM tp 8 PM</p>
            </span>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default page;

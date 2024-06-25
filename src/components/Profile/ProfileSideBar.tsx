"use client";
import React, { useState } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import AddDetailsModal from "./AddDetailsModal";
import { useUser } from "@/context/UserContext";
import Image from "next/image";

interface Props {
  handleComponent: (args: string) => void;
  componentName: string;
  handleOrder: () => void;
}
const ProfileSidebar: React.FC<Props> = ({
  handleComponent,
  componentName,
  handleOrder,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const { userDetails } = useUser();

  return (
    <div>
      <div className="my-div hidden sm:block  p-6 h-screen bg-[#E26178] bg-opacity-5 lg:flex lg:flex-col lg:justify-center">
        <div className="flex text-white bg-[#E26178] w-[80px] h-[80px] rounded-full text-[30px] items-center justify-center">
          {userDetails?.profile_picture ? (
            <Image
              src={userDetails?.profile_picture}
              className="rounded-full h-full w-full"
              alt="Profile Picture"
              width={90}
              height={100}
            />
          ) : (
            <Icon.UserCircle size={50} />
          )}
        </div>  
        <div>
          <p className="text-xl font-semibold mt-2">Add Details</p>
          <span
            className="flex text-[#e26178] mt-2 cursor-pointer"
            onClick={openModal}
          >
            Edit Profile
            <span className="mt-1">
              <Icon.PencilSimple />
            </span>
          </span>
        </div>
        <div className="w-full  text-center flex flex-col  gap-4 font-medium mt-3">
          <div
            className={`flex items-center p-2 text-black hover:bg-[white] hover:text-[#e26178] cursor-pointer ${
              componentName === "personalInfo" ? "profile-sidebar" : ""
            }`}
            onClick={() => handleComponent("personalInfo")}
          >
            <span className="mr-1">
              <Icon.UserCircle size={22} />
            </span>
            <p>Personal Info</p>
          </div>
          <div onClick={() => handleOrder()}>
            <div
              className={`flex items-center p-2 text-black hover:bg-[white] hover:text-[#e26178] cursor-pointer ${
                componentName === "orders" ? "profile-sidebar" : ""
              }`}
              onClick={() => handleComponent("orders")}
            >
              <span className="mr-1">
                <Icon.Cube size={22} />
              </span>
              Orders
            </div>
          </div>
          <div
            className={`flex items-center p-2 text-black hover:bg-[white] hover:text-[#e26178] cursor-pointer ${
              componentName === "wishlist" ? "profile-sidebar" : ""
            }`}
            onClick={() => handleComponent("wishlist")}
          >
            <span className="mr-1">
              <Icon.Heart size={22} />
            </span>
            Wishlist
          </div>
          <div
            className={`flex items-center p-2 text-black hover:bg-[white] hover:text-[#e26178] cursor-pointer ${
              componentName === "gms" ? "profile-sidebar" : ""
            }`}
            onClick={() => handleComponent("gms")}
          >
            <span className="mr-1">
              <Icon.UserCircle size={22} />
            </span>
            GMS
          </div>
        </div>
      </div>
      <AddDetailsModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default ProfileSidebar;

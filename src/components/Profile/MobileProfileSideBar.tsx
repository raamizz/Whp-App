import React from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Image from "next/image";


interface Props {
  handleComponent: (args: string) => void; 
  componentName: string;
  handleOrder: () => void;
}

const MobileProfileSideBar: React.FC<Props> = ({
  handleComponent,
  componentName,
  handleOrder,
}) => {
  const router = useRouter();
  const { logOut,userDetails } = useUser();
  const handleLogOut = () => {
    logOut();
    router.push("/");
  };
  return (
    <div className="p-3 flex flex-col justify-center">
      <div className="flex flex-col justify-center w-full items-center">
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
          <p className="text-xl font-semibold mt-2">
            {" "}
            {userDetails?.firstname} {userDetails?.lastname}
          </p>
          <span className="flex text-[#e26178] mt-2">
            Edit Profile
            <span className="mt-1">
              <Icon.PencilSimple />
            </span>
          </span>
        </div>
      </div>
      <div>
        <div
          className={`flex items-center justify-between p-2 text-black hover:bg-[white] hover:text-[#e26178] cursor-pointer `}
          onClick={() => handleComponent("personalInfo")}
        >
          <div className="flex">
            <span className="mr-1">
              <Icon.UserCircle size={22} />
            </span>
            <p>Personal Information</p>
          </div>
          <div>
            <Icon.CaretRight weight="fill" />
          </div>
        </div>
        <div onClick={() => handleOrder()}>
          <div
            className={`flex items-center justify-between p-2 text-black hover:bg-[white] hover:text-[#e26178] cursor-pointer `}
            onClick={() => handleComponent("orders")}
          >
            <div className="flex">
              <span className="mr-1">
                <Icon.Cube size={22} />
              </span>
              <p>Orders</p>
            </div>
            <div>
              <Icon.CaretRight weight="fill" />
            </div>
          </div>
        </div>
        <div
          className={`flex items-center justify-between p-2 text-black hover:bg-[white] hover:text-[#e26178] cursor-pointer `}
          onClick={() => handleComponent("wishlist")}
        >
          <div className="flex">
            <span className="mr-1">
              <Icon.Heart size={22} />
            </span>
            <p>Wishlist</p>
          </div>
          <div>
            <Icon.CaretRight weight="fill" />
          </div>
        </div>
        <div
          className={`flex items-center justify-between p-2 text-black hover:bg-[white] hover:text-[#e26178] cursor-pointer `}
          onClick={() => handleComponent("gms")}
        >
          <div className="flex">
            <span className="mr-1">
              <Icon.UserCircle size={22} />
            </span>
            <p>GMS</p>
          </div>
          <div>
            <Icon.CaretRight weight="fill" />
          </div>
        </div>
      </div>
      <div
        className="flex mt-5 border border-[#e26178] justify-center text-[#e26178] p-2"
        onClick={() => handleLogOut()}
      >
        Logout
      </div>
    </div>
  );
};

export default MobileProfileSideBar;

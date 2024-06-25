"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ModalSearch from "@/components/Modal/ModalSearch";
import { useUser } from "@/context/UserContext";
import { useCart } from "@/context/CartContext";

const StickyNavProductPage = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [clicked, setClicked] = useState<number>(1);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const { isLoggedIn, userDetails, getUser } = useUser();
  const { cartItems } = useCart();
  const pathname = usePathname();
  const toggleSearchModal = () => {
    setIsSearchModalOpen((prevState) => !prevState);
  };

  const cartLength: number = cartItems ? cartItems.length : 0;

  const handleOptionClicked = (option: number) => {
    setClicked(option);
  };
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    const handleChange = (e: any) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addListener(handleChange);

    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, []);
  useEffect(() => {
    if (isLoggedIn && !userDetails) {
      getUser();
    }
  }, [isLoggedIn, userDetails, getUser]);
  if (!isMobile) {
    return null;
  }

  return (
    <>
      <div className="fixed px-2 py-1 bg-white z-10 bottom-0 w-full">
        <div className="flex justify-evenly items-center">
          <Link href={"/"}>
            <div
              className={`${
                pathname.includes("") &&
                !pathname.includes("profile") &&
                !pathname.includes("offers") &&
                !pathname.includes("checkout")
                  ? "text-[#e26178]"
                  : ""
              } flex flex-col items-center`}
              onClick={() => handleOptionClicked(1)}
            >
              <Icon.HouseLine size={25} />
              {/* <p>Home</p> */}
            </div>
          </Link>

          <div
            className={`${
              pathname.includes("/search-result") ? "text-[#e26178]" : ""
            } flex flex-col items-center`}
            onClick={toggleSearchModal} // Open the search modal when clicked
          >
            <Icon.MagnifyingGlass size={25} />
            {/* <p>Search</p> */}
          </div>

          <Link href={"/offers"}>
            <div
              className={`${
                pathname.includes("offers") ? "text-[#e26178]" : ""
              } flex flex-col items-center`}
              onClick={() => handleOptionClicked(3)}
            >
              <Icon.SealPercent size={25} />
              {/* <p>Offers</p> */}
            </div>
          </Link>
          <Link href={`${isLoggedIn ? "/profile" : "/register"}`}>
            <div
              className={`${
                pathname.includes("profile") ? "text-[#e26178]" : ""
              } flex flex-col items-center`}
              onClick={() => handleOptionClicked(4)}
            >
              <Icon.User size={25} />
              {/* {isLoggedIn ? (
                <p>{userDetails?.customer?.firstname}</p>
              ) : (
                <p>Login</p>
              )} */}
            </div>
          </Link>
          <Link href={"/checkout"}>
            <div
              className={`${
                pathname.includes("checkout") ? "text-[#e26178]" : ""
              } flex flex-col items-center`}
              onClick={() => handleOptionClicked(5)}
            >
              <div>
                <Icon.ShoppingCart size={25} />
                {cartLength > 0 && (
                  <span className="quantity cart-quantity absolute right-[30px] top-1 text-xs text-white bg-[#E26178] w-4 h-4 flex items-center justify-center rounded-full">
                    {cartLength}
                  </span>
                )}
              </div>

              {/* <p>Cart</p> */}
            </div>
          </Link>
        </div>
      </div>
      {isSearchModalOpen && (
        <ModalSearch
          closeModal={toggleSearchModal}
          isModalOpen={isSearchModalOpen}
        />
      )}
    </>
  );
};

export default StickyNavProductPage;

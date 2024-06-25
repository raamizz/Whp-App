"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import useLoginPopup from "@/store/useLoginPopup";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import useMenuMobile from "@/store/useMenuMobile";
import TopNavOne from "./TopNavOne";
import ContactInfo from "@/components/Other/ContactInfo";
import { useAllCategoryContext } from "@/context/AllCategoryContext";
import ModalSearch from "@/components/Modal/ModalSearch";
import { useCategory } from "@/context/CategoryContex";
import { useWishlist } from "@/context/WishlistContext";
import BookExchangeModal from "@/components/Other/BookExchangeModal";

interface Props {
  props: string;
}

const NavTwo: React.FC<Props> = ({ props }) => {
  const [searchKeyword, setSearchKeyword] = useState<any>("");
  const { categories } = useAllCategoryContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { openLoginPopup, handleLoginPopup, handleCloseLoginPop } =
    useLoginPopup();
  const { openMenuMobile, handleMenuMobile } = useMenuMobile();
  const { wishlistItems } = useWishlist();
  const { cartItems } = useCart();
  const { userState, userDetails, getUser, logOut } = useUser();
  const isLoggedIn = userState.isLoggedIn;
  const router = useRouter();
  const [contactPopUp, setContactPopUp] = useState<boolean>(false);
  const [fixedHeader, setFixedHeader] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const { category, setCustomcategory } = useCategory();
  const [openSubNavMobile, setOpenSubNavMobile] = useState<number | null>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [appointmentModal, setAppointmentModal] = useState<boolean>(false);

  const pathname = usePathname();
  const handleOnClose = () => {
    setAppointmentModal(false);
  };

  // console.log("appointement", appointmentModal);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        handleCloseLoginPop();
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn && !userDetails) {
      getUser();
    }
  }, [isLoggedIn, userDetails, getUser]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        contactRef.current &&
        !contactRef.current.contains(event.target as Node)
      ) {
        setContactPopUp(false);
      } else {
        // setContactPopUp(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLoginDrop = () => {
    localStorage.setItem("redirectPath", pathname);
    handleLoginPopup();
  };

  const handleLogOut = () => {
    logOut();
    router.push("/");
  };

  const handleProfilePage = () => {
    router.push("/profile");
  };

  const handleOpenSubNavMobile = (index: number) => {
    setOpenSubNavMobile(openSubNavMobile === index ? null : index);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setFixedHeader(
        (scrollPosition > 0 && scrollPosition < lastScrollPosition) ||
          scrollPosition > lastScrollPosition
      );
      setLastScrollPosition(scrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPosition]);

  const cartLength: number = cartItems ? cartItems.length : 0;

  const handleContactPopup = () => {
    setContactPopUp(!contactPopUp);
  };
  return (
    <div ref={contactRef}>
      <div
        className={`top-nav header-menu w-full md:h-[65px] h-[65px] ${
          fixedHeader ? " fixed" : "relative"
        } text-rose-950 ${props}`}
        ref={divRef}
      >
        <div className="container mx-auto h-full py-2 ">
          <div className="top-nav-main flex justify-between items-center ">
            <div className="left-content flex items-center ">
              <Link href={"/"}>
                <Image
                  src={"/images/other/main_logo.png"}
                  width={35}
                  height={32}
                  alt="80x80"
                  className=" object-cover mr-2"
                />
              </Link>
              <div className="md:hidden lg:block max-sm:hidden">
                <Link href={"/"}>
                  <Image
                    src={"/images/other/whp_name_logo.png"}
                    width={156}
                    height={50}
                    alt="80x80"
                    className=" object-cover"
                  />
                </Link>
              </div>
            </div>
            <div className="flex sm:block lg:hidden md:hidden justify-between">
              <Link href={"/blog"}>
                <div>
                  <Image
                    src={"/images/icons/blog.svg"}
                    alt={"contactIcon"}
                    width={25}
                    height={25}
                  />
                </div>
              </Link>

              <div className="ml-4" onClick={handleContactPopup}>
                <Image
                  src={"/images/icons/contact.svg"}
                  alt={"contactIcon"}
                  width={25}
                  height={25}
                />
              </div>
              {contactPopUp ? <ContactInfo /> : null}
              {/* <div className="ml-4 text-black">
                <Icon.MapPin size={25} />
              </div> */}
              <Link href={"/wishlist"}>
                <div className="ml-4 text-black">
                  <Icon.Heart size={25} />
                  {wishlistItems.length > 0 && (
                    <span className="quantity cart-quantity absolute right-14 top-2.5 text-xs text-white bg-[#E26178] w-4 h-4 flex items-center justify-center rounded-full">
                      {wishlistItems.length}
                    </span>
                  )}
                </div>
              </Link>

              <div className="ml-4" onClick={handleMenuMobile}>
                <Image
                  src={"/images/icons/hamBurgerIcon.png"}
                  alt={"hamBurgerIcon"}
                  width={25}
                  height={25}
                />
              </div>
            </div>
            <div className="form-search w-48 relative max-lg:hidden">
              <Icon.MagnifyingGlass
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              />
              <input
                type="text"
                placeholder="Search"
                readOnly={true}
                className="h-10 rounded-lg border border-line caption2 w-full pl-4 pr-4 bg-[#f7f7f7] focus:outline-none"
                value={searchKeyword}
                onClick={() => setIsModalOpen(true)}
              />
            </div>
            {isModalOpen && (
              <ModalSearch
                closeModal={() => setIsModalOpen(false)}
                isModalOpen={isModalOpen}
              />
            )}

            <div
              className="ps-3 right-content flex items-center  max-md:hidden "
              ref={contactRef}
            >
              <div className="right flex gap-7 relative z-[1] ">
                <div className="list-action flex items-center gap-8 ">
                  <div className="user-icon flex  items-center justify-between cursor-pointer gap-8">
                    <div
                      className={`flex flex-col items-center ${
                        pathname.includes("/offer") ? "text-[#e26178]" : ""
                      }`}
                    >
                      <Link href={"/offers"}>
                        <Icon.SealPercent size={30} />
                      </Link>
                      <p className="text-sm">Offers</p>
                    </div>
                    <div
                      className="hidden max-lg:block"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <div className="flex flex-col items-center">
                        <Icon.MagnifyingGlass size={28} />
                        <p className="text-sm">Search</p>
                      </div>
                    </div>
                    <Link href={"/blog"}>
                      <div
                        className={`flex flex-col items-center ${
                          pathname.includes("/blog") ? "text-[#e26178]" : ""
                        }`}
                      >
                        <Icon.Newspaper size={30}/>
                        <p className="text-sm">Blog</p>
                      </div>
                    </Link>
                    <div
                      className={`flex flex-col items-center ${
                        contactPopUp ? "text-[#e26178]" : ""
                      }`}
                      onClick={handleContactPopup}
                    >
                      <Icon.Headset size={30} />
                      <p className="text-sm">Contact</p>
                    </div>
                    {contactPopUp ? <ContactInfo /> : null}
                    <span className="w-[2px] h-[40px] bg-[#E9E9E9]"></span>
                    <div className="user-icon flex items-center justify-center cursor-pointer">
                      {isLoggedIn ? (
                        <>
                          <div
                            onClick={handleProfilePage}
                            className={`flex flex-col items-center ${
                              pathname.includes("/profile")
                                ? "text-[#e26178]"
                                : ""
                            }`}
                          >
                            <Icon.User size={28} />
                            <p className="text-sm">{userDetails?.firstname}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            onClick={handleLoginDrop}
                            className="flex flex-col items-center"
                          >
                            <Icon.User size={28} />
                            <p className="text-sm">Login</p>
                          </div>
                          <div
                            className={` login-popup absolute bg-white top-[114px] w-[320px] p-7 rounded-xl bg-surface box-shadow-small z-10
                                            ${openLoginPopup ? "open" : ""}`}
                          >
                            <Link
                              href={"/login"}
                              className="button-main w-full text-center"
                            >
                              Login With OTP
                            </Link>
                            <div className="text-secondary text-center mt-3 pb-4">
                              Don’t have an account?
                              <Link
                                href={"/register"}
                                className="text-black pl-1 hover:underline"
                              >
                                Signup
                              </Link>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div
                    className="max-md:hidden wishlist-icon flex items-center cursor-pointer"
                    // onClick={openModalWishlist}
                  >
                    <Link href={"/wishlist"}>
                      {/* <div>
                        <div className="flex flex-col items-center">
                          <Icon.Heart size={28} color="black" />
                          <p className="text-sm">Wishlist<p>
                        </div>
                        
                      </div> */}
                      <div
                        className="max-md:hidden cart-icon flex items-center relative cursor-pointer"
                        // onClick={openModalWishlist}
                      >
                        <div
                          className={`flex flex-col items-center ${
                            pathname.includes("/wishlist")
                              ? "text-[#e26178]"
                              : ""
                          }`}
                        >
                          <Icon.Heart size={28} />
                          <p className="text-sm">Wishlist</p>
                        </div>
                        {wishlistItems.length > 0 && (
                          <span className="quantity cart-quantity absolute right-1 -top-1.5 text-xs text-white bg-[#E26178] w-4 h-4 flex items-center justify-center rounded-full">
                            {wishlistItems.length}
                          </span>
                        )}
                      </div>
                    </Link>
                  </div>
                  <Link href={"/checkout"}>
                    <div
                      className="max-md:hidden cart-icon flex items-center relative cursor-pointer"
                      // onClick={openModalCart}
                    >
                      <div
                        className={`flex flex-col items-center ${
                          pathname.includes("/checkout") ? "text-[#e26178]" : ""
                        }`}
                      >
                        {/* <Image
                          src={"/images/icons/cart.svg"}
                          alt="Cart"
                          width={30}
                          height={30}
                        /> */}
                        <Icon.ShoppingCart size={30} />
                        <p className="text-sm">Cart</p>
                      </div>
                      {cartLength > 0 && (
                        // <span className="quantity cart-quantity absolute -right-1.5 -top-1.5 text-xs text-white bg-[#E26178] w-4 h-4 flex items-center justify-center rounded-full">
                        <span className="quantity cart-quantity absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2 text-xs text-white bg-[#E26178] w-4 h-4 flex items-center justify-center rounded-full">
                          {cartLength}
                        </span>
                      )}
                    </div>
                  </Link>
                  <div className="w-[2px] h-[40px]  bg-[#E9E9E9]"></div>
                  <div className="choose-currency flex items-center p-2 bg-[#E9E9E9] bg-opacity-[0.1] ">
                    <select
                      name="currency"
                      id="chooseCurrency"
                      className="caption2 bg-[#E9E9E9] bg-opacity-[0.1]  text-[16px] font-[500] pe-2 p-2 cursor-pointer"
                    >
                      <option value="INR">&#8377; INR</option>
                      {/* <option value="USD">&#36; USD</option>
                      <option value="EUR">&#8364; EUR</option>
                      <option value="GBP">&#163; GBP</option> */}
                    </select>
                    <Image
                      className="cursor-pointer"
                      src={"/images/icons/arrow.svg"}
                      alt="Arrow"
                      width={30}
                      height={30}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="menu-mobile" className={`${openMenuMobile ? "open" : ""}`}>
        <TopNavOne textColor="text-white" />
        <div className="menu-container bg-white h-full">
          <div className="container h-full">
            <div className="menu-main h-full overflow-hidden">
              <div className="heading py-2 relative flex items-center justify-end">
                <div
                  className="close-menu-mobile-btn absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface flex items-center justify-center"
                  onClick={handleMenuMobile}
                >
                  <Icon.X size={40} />
                </div>
                {isLoggedIn ? (
                  <div onClick={handleLogOut}>
                    <p className="text-lg font-semibold">Logout</p>
                  </div>
                ) : (
                  <div onClick={handleMenuMobile} className="flex items-center">
                    <Link href={"/register"}>
                      <p className="text-lg font-semibold">Register</p>
                    </Link>
                    <div
                      onClick={handleMenuMobile}
                      className="mx-4 h-6 border-l border-gray-400"
                    ></div>
                    <Link href={"/login"}><h2 className="text-lg font-semibold">Login</h2></Link>
                  </div>
                )}
                {/* <Link href={"/checkout"}>
                  <div className="ml-3 relative">
                    <Image
                      src={"/images/icons/cart.svg"}
                      alt="Cart"
                      width={30}
                      height={30}
                    />
                    <span className="quantity cart-quantity absolute -right-0 -top-1.5 text-xs text-white bg-[#E26178] w-4 h-4 flex items-center justify-center rounded-full">
                      {cartLength}
                    </span>
                  </div>
                </Link> */}
              </div>
              <div className=" flex form-search relative mt-2">
                <div className="mr-3">
                  <Image
                    src="/dummy/tryAtHomeButton.png"
                    alt="try_at_home"
                    width={160}
                    height={60}
                  />
                </div>
                <div
                  className="flex bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] text-white items-center justify-center w-[190px]"
                  onClick={() => setAppointmentModal(true)}
                >
                  <div className="mr-3">
                    <Image
                      src="/images/icons/exchangeGold.png"
                      alt="Exchange_Gold"
                      width={15}
                      height={15}
                    />
                  </div>
                  <div>
                    <p className="text-md">Exchange Gold</p>
                  </div>
                </div>
                {appointmentModal && (
                  <BookExchangeModal
                    title={"Exchange Your Gold"}
                    closeModal={handleOnClose}
                  />
                )}
              </div>
              <div className="list-nav mt-6">
                <ul>
                  <li
                    className={`${openSubNavMobile === 1 ? "open" : ""}`}
                    onClick={() => {
                      handleOpenSubNavMobile(1);
                      setCustomcategory("new_Arrival");
                    }}
                  >
                    <Link
                      href={{
                        pathname: "/products",
                        query: { url: "c-new_Arrival" },
                      }}
                      onClick={handleMenuMobile}
                    >
                      <p className="text-xl font-semibold flex items-center justify-between mt-5">
                        New Arrivals
                      </p>
                    </Link>
                  </li>
                  <li
                    className={`${openSubNavMobile === 2 ? "open" : ""}`}
                    onClick={() => {
                      handleOpenSubNavMobile(2);
                      setCustomcategory("14kt");
                    }}
                  >
                    <Link
                      href={{
                        pathname: "/products",
                        query: { url: "k-14kt" },
                      }}
                      onClick={handleMenuMobile}
                    >
                      <p className="text-xl font-semibold flex items-center justify-between mt-5">
                        14 Karat
                      </p>
                    </Link>
                  </li>
                  <li
                    className={`${openSubNavMobile === 3 ? "open" : ""}`}
                    onClick={() => {
                      handleOpenSubNavMobile(3);
                      setCustomcategory("ring");
                    }}
                  >
                    <Link
                      href={{
                        pathname: "/products",
                        query: { url: "c-ring" },
                      }}
                      onClick={handleMenuMobile}
                    >
                      <p className="text-xl font-semibold flex items-center justify-between mt-5">
                        Rings
                      </p>
                    </Link>
                  </li>
                  <li
                    className={`${openSubNavMobile === 4 ? "open" : ""}`}
                    onClick={() => {
                      handleOpenSubNavMobile(4);
                      setCustomcategory("earring");
                    }}
                  >
                    <Link
                      href={{
                        pathname: "/products",
                        query: { url: "c-earring" },
                      }}
                      onClick={handleMenuMobile}
                    >
                      <p className="text-xl font-semibold flex items-center justify-between mt-5">
                        Earrings
                      </p>
                    </Link>
                  </li>
                  <li
                    className={`${openSubNavMobile === 5 ? "open" : ""}`}
                    onClick={() => {
                      handleOpenSubNavMobile(5);
                      setCustomcategory("pendant");
                    }}
                  >
                    <Link
                      href={{
                        pathname: "/products",
                        query: { url: "c-pendant" },
                      }}
                      onClick={handleMenuMobile}
                    >
                      <p className="text-xl font-semibold flex items-center justify-between mt-5">
                        Pendants
                      </p>
                    </Link>
                  </li>
                  <li
                    className={`${openSubNavMobile === 6 ? "open" : ""}`}
                    onClick={() => {
                      handleOpenSubNavMobile(6);
                      setCustomcategory("chain");
                    }}
                  >
                    <Link
                      href={{
                        pathname: "/products",
                        query: { url: "c-chain" },
                      }}
                      onClick={handleMenuMobile}
                    >
                      <p className="text-xl font-semibold flex items-center justify-between mt-5">
                        Chains
                      </p>
                    </Link>
                  </li>
                  <li
                    className={`${openSubNavMobile === 7 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(7)}
                  >
                    <p className="text-xl font-semibold flex items-center mt-5">
                      All Jewellery
                      <span className="text-right">
                        <Icon.CaretRight size={20} weight="fill" />
                      </span>
                    </p>
                    <div className="sub-nav-mobile h-full">
                      <div
                        className="back-btn flex items-center gap-3"
                        onClick={() => handleOpenSubNavMobile(1)}
                      >
                        <Icon.CaretLeft />
                        Back
                      </div>
                      <div className="list-nav-item w-full h-full grid grid-cols-2 pt-2 pb-6">
                        <ul>
                          {categories &&
                            categories.map((item: any, index: any) => (
                              <div
                                key={item.id}
                                onClick={() => {
                                  handleMenuMobile(),
                                    setCustomcategory(item.url);
                                }}
                              >
                                <li className="leading-[0px]">
                                  <Link
                                    href={{
                                      pathname: "/products",
                                      query: { url: item.url },
                                    }}
                                    className=" text-secondary duration-300"
                                  >
                                    <div className="flex">
                                      <Image
                                        src={item.menuImg}
                                        alt={item.name}
                                        height={25}
                                        width={25}
                                        className="mr-1"
                                      />
                                      <p>{item.name}</p>
                                    </div>
                                  </Link>
                                </li>
                              </div>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li
                    className={`${openSubNavMobile === 8 ? "open" : ""}`}
                    onClick={() => {
                      handleOpenSubNavMobile(8);
                      setCustomcategory("_men");
                    }}
                  >
                    <Link
                      href={{ pathname: "/products", query: { url: "g-men" } }}
                      onClick={handleMenuMobile}
                    >
                      <p className="text-xl font-semibold flex items-center justify-between mt-5">
                        Men's Jewellery
                      </p>
                    </Link>
                  </li>
                  <li
                    className={`${openSubNavMobile === 8 ? "open" : ""}`}
                    onClick={() => {
                      handleOpenSubNavMobile(8);
                    }}
                  >
                    <Link href={"/gifts"} onClick={handleMenuMobile}>
                      <p
                        className={`text-xl font-semibold flex items-center mt-5`}
                      >
                        Gifts
                        {/* <span className="text-right">
                          <Icon.CaretRight size={20} weight="fill" />
                        </span> */}
                      </p>
                    </Link>
                  </li>
                  <li
                    className={`${openSubNavMobile === 9 ? "open" : ""}`}
                    onClick={() => {
                      handleOpenSubNavMobile(9);
                    }}
                  >
                    <Link href={"/benefit"} onClick={handleMenuMobile}>
                      <p
                        className={`text-xl font-semibold flex items-center  mt-5`}
                      >
                        Gold Services
                        {/* <Icon.CaretRight size={20} weight="fill" /> */}
                      </p>
                    </Link>
                  </li>
                </ul>
              </div>
              {/* <div className="flex mt-2 bg-[#fdf4f6] p-2">
                <div>
                  <p className="text-lg font-semibold">Download the WHP App</p>
                  <Image
                    src={"/dummy/appStoreButton.png"}
                    alt={"downloadAppButton"}
                    width={113}
                    height={34}
                  />
                  <Image
                    src={"/dummy/playStoreButton.png"}
                    alt={"downloadAppButton"}
                    width={113}
                    height={34}
                  />
                </div>
                <div>
                  <Image
                    src={"/dummy/dummyPhoneApp.png"}
                    alt={"PhoneAppBanner"}
                    width={140}
                    height={164}
                  />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavTwo;

"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { usePathname, useSearchParams } from "next/navigation";
import { useAllCategoryContext } from "@/context/AllCategoryContext";
import { CategoryType } from "@/type/CategoryType";
import { useRouter } from "next/navigation";
import { useCategory } from "@/context/CategoryContex";
import axios from "@/utils/axios";
import { baseUrl } from "@/utils/constants";
import MobileMainCategorySwiper from "@/components/Home1/MobileMainCategorySwiper";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";

interface Props {
  props: string;
}

const NavHoverMenu: React.FC<Props> = ({ props }) => {
  const [isMobile, setIsMobile] = useState(false);
  const searchParmas = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { categories } = useAllCategoryContext();
  const { category, setCustomcategory } = useCategory();
  const [fixedHeader, setFixedHeader] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsSubMenuVisible(true);
  };

  const handleMouseLeave = () => {
    setIsSubMenuVisible(false);
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

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1022px)");
    const handleChange = (e: any) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addListener(handleChange);

    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, []);

  // const handleUrl = (value: any) => {
  //   console.log("handleUrl", value);
  //   router.push(`/products/?gender=${value}`);
  // };
  if (isMobile) {
    return null;
  }
  return (
    <>
      <div
        className={`header-menu-navHoverMenu style-one ${
          fixedHeader ? " fixed" : "relative"
        } w-full md:h-[37px] h-[40px]`}
      >
        <div className="container mx-auto h-full">
          <MobileMainCategorySwiper />
          <div className="header-main flex items-center justify-evenly w-full h-full">
            <div className="menu-main h-full xl:w-full flex items-center w-full max-lg:hidden xl:absolute xl:top-1/2 xl:left-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2">
              <ul className="flex items-center justify-evenly h-full w-full text-rose-950">
                <li className="h-full relative">
                  <Link
                    href=""
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={`text-button-uppercase duration-300 h-full flex items-center justify-center gap-1 ${
                      isSubMenuVisible ? "sub-menu-visible" : ""
                    }`}
                  >
                    All Jewellery
                    {isSubMenuVisible ? (
                      <TiArrowSortedUp className="cursor-pointer" size={20} />
                    ) : (
                      <TiArrowSortedDown className="cursor-pointer" size={20} />
                    )}
                  </Link>
                  <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={`sub-menu absolute py-3 px-5 -left-4 w-max grid grid-cols-5 gap-5 bg-white rounded-b-xl ${
                      isSubMenuVisible ? "visible" : ""
                    }`}
                  >
                    <ul>
                      <p className="font-semibold text-black">
                        Explore Categories
                      </p>

                      {categories &&
                        categories.map((item: any, index: any) => (
                          <React.Fragment key={item.id}>
                            <li className="leading-[0px]">
                              <Link
                                href={{
                                  pathname: "/products",
                                  query: { url: item.url },
                                }}
                                className=" text-secondary duration-300"
                                onClick={() => setCustomcategory(item.url)}
                              >
                                <div className="flex">
                                  <Image
                                    src={item.menuImg}
                                    alt={item.name}
                                    height={25}
                                    width={25}
                                    className="mr-1"
                                    style={{ width: "auto", height: "auto" }}
                                  />
                                  <p>{item.name}</p>
                                </div>
                              </Link>
                            </li>
                          </React.Fragment>
                        ))}
                    </ul>
                    <ul>
                      <li className="font-semibold text-black">Shop For</li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "g-men" },
                          }}
                          onClick={() => setCustomcategory("_men")}
                        >
                          Men
                        </Link>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "g-women" },
                          }}
                          // onClick={() => handleUrl("women")}
                        >
                          Women
                        </Link>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "g-kids" },
                          }}
                          // onClick={() => handleUrl("women")}
                        >
                          Kids
                        </Link>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <p className="font-semibold text-black">Shop by type</p>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "m-gold" },
                          }}
                          // onClick={() => setCustomcategory("gold")}
                        >
                          Gold
                        </Link>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "m-Rose_Gold" },
                          }}
                          onClick={() => setCustomcategory("Rose Gold")}
                        >
                          Rose Gold
                        </Link>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "m-White_Gold" },
                          }}
                          onClick={() => setCustomcategory("White Gold")}
                        >
                          White Gold
                        </Link>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "m-diamond" },
                          }}
                          onClick={() => setCustomcategory("diamond")}
                        >
                          Diamond
                        </Link>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "m-gemstones" },
                          }}
                          onClick={() => setCustomcategory("gemstones")}
                        >
                          Gemstones
                        </Link>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <p className="font-semibold text-black">
                          Shop By Price
                        </p>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "p-0to10000" },
                          }}
                          onClick={() => setCustomcategory("Less than 10K")}
                        >
                          less than 10k
                        </Link>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "p-10000to20000" },
                          }}
                          onClick={() => setCustomcategory("10K to 20K")}
                        >
                          10k to 20k
                        </Link>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "p-20000to30000" },
                          }}
                          onClick={() => setCustomcategory("20K to 30K")}
                        >
                          20k to 30k
                        </Link>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "p-30000to40000" },
                          }}
                          onClick={() => setCustomcategory("30K to 40K")}
                        >
                          30K to 40K
                        </Link>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "p-40000to50000" },
                          }}
                          onClick={() => setCustomcategory("40K to 50K")}
                        >
                          40K to 50K
                        </Link>
                      </li>
                      <li className="text-secondary duration-300 cursor-pointer">
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "p-50000to10000000" },
                          }}
                          onClick={() => setCustomcategory("50K and Above")}
                        >
                          50K and Above
                        </Link>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <p className="font-semibold text-black">
                          Shop By Karat
                        </p>
                      </li>
                      <li>
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "k-14KT" },
                          }}
                          onClick={() => setCustomcategory("14KT")}
                        >
                          14KT
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "k-18KT" },
                          }}
                          onClick={() => setCustomcategory("18KT")}
                        >
                          18KT
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "k-22KT" },
                          }}
                          onClick={() => setCustomcategory("22KT")}
                        >
                          22KT
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "k-23KT" },
                          }}
                          onClick={() => setCustomcategory("23KT")}
                        >
                          23KT
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={{
                            pathname: "/products",
                            query: { url: "k-24KT" },
                          }}
                          onClick={() => setCustomcategory("24KT")}
                        >
                          24KT
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li
                  className="h-full"
                  onClick={() => setCustomcategory("new_Arrival")}
                >
                  <Link
                    href={{
                      pathname: "/products",
                      query: { url: "c-new_Arrival" },
                    }}
                    className={`text-button-uppercase duration-300 h-full flex items-center justify-center ${
                      pathname.includes("/products") &&
                      searchParmas.get("url")?.startsWith("c-new_Arrival")
                        ? "active"
                        : ""
                    }`}
                  >
                    New Arrival
                  </Link>
                </li>
                <li
                  className="h-full"
                  onClick={() => {
                    setCustomcategory("earring");
                    // handleUrl("c-earring");
                  }}
                >
                  <Link
                    href={{
                      pathname: "/products",
                      query: { url: "c-earring" },
                    }}
                    className={`text-button-uppercase duration-300 h-full flex items-center justify-center ${
                      pathname.includes("/products") &&
                      searchParmas.get("url")?.startsWith("c-earring")
                        ? "active"
                        : ""
                    }`}
                  >
                    Earrings
                  </Link>
                </li>

                <li
                  className="h-full"
                  onClick={() => setCustomcategory("pendant")}
                >
                  <Link
                    href={{
                      pathname: "/products",
                      query: { url: "c-pendant" },
                    }}
                    className={`text-button-uppercase duration-300 h-full flex items-center justify-center ${
                      pathname.includes("/products") &&
                      searchParmas.get("url")?.startsWith("c-pendant")
                        ? "active"
                        : ""
                    }`}
                  >
                    Pendants
                  </Link>
                </li>
                <li
                  className="h-full"
                  onClick={() => setCustomcategory("bangle")}
                >
                  <Link
                    href={{
                      pathname: "/products",
                      query: { url: "c-bangle" },
                    }}
                    className={`text-button-uppercase duration-300 h-full flex items-center justify-center ${
                      pathname.includes("/products") &&
                      searchParmas.get("url")?.startsWith("c-bangle")
                        ? "active"
                        : ""
                    }`}
                  >
                    Bangles
                  </Link>
                </li>
                <li
                  className="h-full"
                  onClick={() => setCustomcategory("Bracelet")}
                >
                  <Link
                    href={{
                      pathname: "/products",
                      query: { url: "c-bracelet" },
                    }}
                    className={`text-button-uppercase duration-300 h-full flex items-center justify-center ${
                      pathname.includes("/products") &&
                      searchParmas.get("url")?.startsWith("c-bracelet")
                        ? "active"
                        : ""
                    }`}
                  >
                    Bracelet
                  </Link>
                </li>
                <li
                  className="h-full"
                  onClick={() => setCustomcategory("necklace")}
                >
                  <Link
                    href={{
                      pathname: "/products",
                      query: { url: "c-necklace" },
                    }}
                    className={`text-button-uppercase duration-300 h-full flex items-center justify-center ${
                      pathname.includes("/products") &&
                      searchParmas.get("url") === "c-necklace"
                        ? "active"
                        : ""
                    }`}
                  >
                    Necklace
                  </Link>
                </li>
                <li className={`h-full relative`}>
                  <Link
                    href={{ pathname: "/offers" }}
                    className={`text-button-uppercase duration-300 h-full flex items-center justify-center ${
                      pathname.includes("/offers") ? "active" : ""
                    }`}
                  >
                    Offers
                  </Link>
                  {/* <div className="sub-menu py-3 px-5 -left-10 absolute bg-white rounded-b-xl">
                  </div> */}
                </li>
                <li className="h-full relative">
                  <Link
                    href={{ pathname: "/gifts" }}
                    className={`text-button-uppercase duration-300 h-full flex items-center justify-center ${
                      pathname.includes("/gifts") ? "active" : ""
                    }`}
                  >
                    Gifts
                  </Link>
                  {/* <div className="sub-menu py-3 px-5 -left-10 absolute bg-white rounded-b-xl">
                  </div> */}
                </li>
                <li className="h-full">
                  <Link
                    href={{ pathname: "/benefit" }}
                    className={`text-button-uppercase duration-300 h-full flex items-center justify-center ${
                      pathname.includes("/benefit") ? "active" : ""
                    }`}
                  >
                    Gold Services
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default NavHoverMenu;

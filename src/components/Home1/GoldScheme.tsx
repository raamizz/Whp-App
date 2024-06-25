import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";

const GoldScheme = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1000px)");

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const handleNavigation = (href: string) => {
    setLoading(true);
    router.push(href);
  };
  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Image
            src="/dummy/loader.gif"
            alt="Loading..."
            height={50}
            width={50}
          />
        </div>
      )}
      <div className="mt-5  text-rose-950 bg-[#FFFAF9]">
        <div className="lg:pl-7 grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1  ">
          <div className="px-8 lg:px-0">
            <h2 className="max-sm:text-center  font-semibold">
              GOLD MONTHLY SCHEME
            </h2>
            <h1 className="py-4 lg:text-5xl md:text-3xl text-center lg:text-left text-2xl md:text-left">
              It's time to invest in a Golden Future
            </h1>
            <p className="text-rose-950 text-center lg:text-left md:text-left">
              Invest in timeless wealth with our Gold Scheme, catering to a wide
              range of budgets. Making gold investment accessible to everyone.
              Watch your savings grow as you accumulate one of the most enduring
              assets.
            </p>

            {/* <Link href="/benefit">
              <button
                type="button"
                className="text-white bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] hover:bg-pink-600 focus:ring-4 focus:outline-none font-medium text-sm px-12 py-3.5 text-center mt-6 mb-20"
              >
                Know More
              </button>
            </Link> */}
            <Link
              className=" lg:pb-10 text-center lg:text-left md:justify-start inline-flex w-full justify-center"
              href="/benefit"
            >
              <button
                type="button"
                className="text-white flex justify-center px-6 py-3  bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] focus:ring-4 focus:outline-none font-medium text-sm  text-center my-4 "
              >
                Know More
                <span className="mt-1 ml-2">
                  <Icon.ArrowRight />
                </span>
              </button>
            </Link>
            {!isMobile && (
              <div className="p-0 bg-[#FFFAF9]">
                <div className="flex gap-3 sm:flex-row p-0  md:py-5 md:ps-5 mx-auto items-center">
                  <Image
                    src={"/images/other/BenefitBangle.jpg"}
                    alt="Benefit"
                    width={400}
                    height={100}
                    className="w-full sm:w-auto h-auto"
                  />
                  <div className="flex flex-col justify-between gap-3">
                    <div>
                      <h1 className="text-xl font-semibold pb-2">
                        GOLD ACCOUNT
                      </h1>
                      <p className="text-sm pe-2">
                        Open a WHP Gold Scheme account with an amount as low as
                        ₹2000. Make regular installments and get discounts.
                      </p>
                    </div>
                    <div className="flex w-full mt-5">
                      <button
                        // href="#"
                        onClick={() => handleNavigation("/benefit")}
                        className="text-[#E26178] flex justify-center text-start font-semibold underline"
                      >
                        Benefit Calculator
                        <span className="mt-1 ml-2">
                          <Icon.ArrowRight />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Image
            src={"/images/other/GoldScheme.jpg"}
            width={1000}
            height={900}
            alt="goldscheme"
          />
          {isMobile && (
            <div className="p-0 bg-[#FFFAF9]">
              <div className="flex gap-3 sm:flex-row p-0  md:py-5 md:ps-5 mx-auto items-center">
                <Image
                  src={"/images/other/BenefitBangle.jpg"}
                  alt="Benefit"
                  width={400}
                  height={100}
                  className="w-full sm:w-auto h-auto"
                />
                <div className="flex flex-col justify-between gap-3">
                  <div>
                    <h1 className="text-xl font-semibold pb-2">GOLD ACCOUNT</h1>
                    <p className="text-sm pe-2">
                      Open a WHP Gold Scheme account with an amount as low as
                      ₹2000. Make regular installments and get discounts.
                    </p>
                  </div>
                  <div className="flex w-full">
                  <button
                    // href="#"
                    onClick={() => handleNavigation("/benefit")}
                    className="text-[#E26178] flex justify-center text-start font-semibold underline"
                  >
                    Benefit Calculator
                    <span className="mt-1 ml-2">
                      <Icon.ArrowRight />
                    </span>
                  </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GoldScheme;

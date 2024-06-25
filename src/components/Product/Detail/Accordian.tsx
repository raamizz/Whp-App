/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, useEffect } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { ProductType, ProductData } from "@/type/ProductType";
import { TbReplace } from "react-icons/tb";
import { GiCargoShip } from "react-icons/gi";
import { VscTools } from "react-icons/vsc";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaShippingFast } from "react-icons/fa";
import { TbHomeCheck } from "react-icons/tb";
import MobileSizeGuide from "./MobileSizeGuide";
import Image from "next/image";
import Link from "next/link";
interface Props {
  product: ProductData;
}
const Accordian: React.FC<Props> = ({ product }) => {
  const [showAccordian, setShowAccordian] = useState<number>(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 540px)");
    const handleChange = (e: any) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addListener(handleChange);

    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, []);

  const handleToggle = (number: any) => {
    setShowAccordian(number === showAccordian ? null : number);
  };
  const makingCharges: any =
    parseFloat(product?.productDetails?.makingCharges) +
    parseFloat(product?.productDetails?.additionalCost);
  return (
    <div className="mt-7 ">
      <div className="p-4 border-t-2 border-[#f7f7f7]">
        <h2>
          <button
            className="flex w-full justify-between text-xl"
            onClick={() => handleToggle(1)}
          >
            The WHP Advantage
            <span className="right-0">
              <Icon.CaretDown
                size={25}
                className={`${showAccordian === 1 ? "rotate-180" : null}`}
              />
            </span>
          </button>
        </h2>
        {showAccordian == 1 ? (
          <div>
            <div className="mt-5">
              Discover the WHP advantage: where exquisite craftsmanship meets
              timeless elegance, ensuring every piece exudes sophistication and
              allure, setting you apart in style.
            </div>
            <div className="grid grid-cols-4 max-sm:grid-cols-3 justify-items-center mt-5 gap-4">
              <div className="flex flex-col items-center text-center">
                <span className="text-center">
                  <Icon.SketchLogo size={30} weight="thin" />
                </span>
                <span>10000+ Designs</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span>
                  <Image
                    src="/images/other/hallmark.png"
                    alt={"Hall Mark Symbol"}
                    width={40}
                    height={40}
                  />
                  {/* <Icon.CrownSimple size={30} weight="thin" /> */}
                </span>
                <span>BIS Hallmarked</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span>
                  <Icon.Truck size={30} weight="thin" color="#00000" />
                </span>
                <span>Pan India Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span>
                  <Icon.ShieldCheck size={30} weight="thin" />
                </span>
                <span>Safe & Secure Payment</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="p-4 border-t-2 border-[#f7f7f7]">
        <h2>
          <button
            className="flex w-full justify-between text-xl"
            onClick={() => handleToggle(2)}
          >
            Product Details
            <span className="right-0">
              <Icon.CaretDown
                size={25}
                className={`${showAccordian === 2 ? "rotate-180" : null}`}
              />
            </span>
          </button>
        </h2>
        {showAccordian === 2 ? (
          <div>
            <div className="mt-5 ">{product?.productDetails?.longDesc}</div>
            <div className="grid grid-cols-4 max-sm:grid-cols-3 mt-4">
              <div className="p-2 flex flex-col items-center text-center">
                <Icon.Scales className="mr-1 mt-1" size={27} weight="thin" />
                <p>
                  {product?.productDetails?.metalWeight}gms,{" "}
                  {product?.productDetails?.metalType}
                </p>
              </div>
              <div className="p-2 flex flex-col items-center text-center">
                <Icon.HandCoins className="mr-1 mt-1" size={27} weight="thin" />
                <p>
                  {product?.productDetails.metalPurity}{" "}
                  {product?.productDetails.metalType}
                </p>
              </div>
              {product?.productDetails?.isReturnable == 1 && (
                <div className="p-2 flex flex-col items-center text-center">
                  <Icon.ArrowsLeftRight
                    className="mr-1 mt-1"
                    size={27}
                    weight="thin"
                  />
                  <p>7 days easy returns</p>
                </div>
              )}
              {product?.productDetails?.isReplaceable === 1 && (
                <div className="p-2 flex flex-col items-center text-center">
                  <TbReplace className="mr-1 mt-1" size={27} />
                  <p>7 days easy replaceable</p>
                </div>
              )}
              {product?.productDetails?.isInternationalShippingAvailable ===
                1 && (
                <div className="p-2 flex flex-col items-center text-center">
                  <GiCargoShip className="mr-1 mt-1" size={27} />
                  <p>Delivered Internationally</p>
                </div>
              )}
              {product?.productDetails?.customizationAvailability === 1 && (
                <div className="p-2 flex flex-col items-center text-center">
                  <VscTools className="mr-1 mt-1" size={27} />
                  <p>Customization Available</p>
                </div>
              )}
              {product?.productDetails?.fastDelivery === 1 && (
                <div className="p-2 flex flex-col items-center text-center">
                  <FaShippingFast className="mr-1 mt-1" size={27} />
                  <p>Fast Delivery</p>
                </div>
              )}
              {product?.productDetails?.tryAtHome === 1 && (
                <div className="p-2 flex flex-col items-center text-center">
                  <TbHomeCheck className="mr-1 mt-1" size={27} />
                  <p>Try At Home</p>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
      <div className="p-4 border-t-2 border-[#f7f7f7]">
        <h2>
          <button
            className="flex w-full justify-between text-xl"
            onClick={() => handleToggle(3)}
          >
            Size Guide
            <span className="right-0">
              <Icon.CaretDown
                size={25}
                className={`${showAccordian === 3 ? "rotate-180" : null}`}
              />
            </span>
          </button>
        </h2>
        {showAccordian === 3 ? (
          <>
            {isMobile ? (
              <>
                <MobileSizeGuide />
              </>
            ) : (
              <div className="text-center rounded-md w-[80%]">
                <table className="mt-5 bg-[#f7f7f7]">
                  <tr className="">
                    <td className="border-r-2 border-[#F0ECED] border-b-2 p-4">
                      Size
                    </td>
                    <td className="max-sm:p-4 border-r-2 border-[#F0ECED] border-b-2">
                      Diameter(inch)
                    </td>
                    <td className="max-sm:p-4 border-r-2 border-[#F0ECED] border-b-2">
                      Diameter(cms)
                    </td>
                    <td className="max-sm:p-4 border-b-2 border-[#F0ECED]">
                      Circumference(inch)
                    </td>
                  </tr>
                  <tr>
                    <td className="border-r-2 border-[#F0ECED]">2.2</td>
                    <td className="border-r-2 border-[#F0ECED] p-2">2.125</td>
                    <td className="p-2 border-r-2 border-[#F0ECED]">5.4</td>
                    <td className="">6.67</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-r-2 border-[#F0ECED]">2.4</td>
                    <td className="p-2 border-r-2 border-[#F0ECED]">2.25</td>
                    <td className="max-sm:p-2 border-r-2 border-[#F0ECED]">
                      5.7
                    </td>
                    <td className="p-2">7.06</td>
                  </tr>
                  <tr>
                    <td className="border-r-2 border-[#F0ECED] p-2">2.6</td>
                    <td className="p-2 border-r-2 border-[#F0ECED]">2.375</td>
                    <td className="p-2 border-r-2 border-[#F0ECED]">6</td>
                    <td className=" p-2">7.46</td>
                  </tr>
                  <tr>
                    <td className="border-r-2 border-[#F0ECED] p-2">2.8</td>
                    <td className=" border-r-2 border-[#F0ECED] p-2">2.5</td>
                    <td className=" border-r-2 border-[#F0ECED] p-2">6.5</td>
                    <td className=" p-2 rounded-b-lg">7.85</td>
                  </tr>
                </table>
              </div>
            )}
          </>
        ) : null}
      </div>
      <div className="p-4 border-t-2 border-[#f7f7f7]">
        <h2>
          <button
            className="flex w-full justify-between justify-items-center text-xl"
            onClick={() => handleToggle(4)}
          >
            Price Breakup
            <span className="right-0">
              <Icon.CaretDown
                size={25}
                className={`${showAccordian === 4 ? "rotate-180" : null}`}
              />
            </span>
          </button>
        </h2>
        {showAccordian === 4 ? (
          <div className="lg:w-[100%] sm:w-[100%] p-4">
            <div className="flex justify-between border border-[#ebe7e7] p-2">
              <div>Component</div>
              <div>Weight</div>
              <div>Value</div>
            </div>
            <div className="flex justify-between p-2 border border-[#ebe7e7]">
              <div>
                <p>{product.productDetails?.metalType}</p>
                {product.productDetails?.diamondDetails[0]?.diamondClarity !=
                  "" && <p>Diamond</p>}
                <p>Making Charges</p>
                {product.productDetails?.discountValue && (
                  <p>Discount- {product.productDetails?.discountValue}%</p>
                )}
                <p>G.S.T</p>
              </div>
              <div>
                <p>{product.productDetails?.metalWeight} gms</p>
                {product.productDetails?.diamondDetails ? (
                  <p>
                    {product.productDetails?.diamondDetails[0]?.diamondClarity}
                  </p>
                ) : (
                  <p>-</p>
                )}
                {product.productDetails?.makingCharges && <p>-</p>}
                {product.productDetails?.discountValue && <p>-</p>}
                {product.productDetails?.gst && <p>-</p>}
              </div>
              <div>
                <p>
                  ₹
                  {new Intl.NumberFormat("en-IN", {
                    minimumFractionDigits: 2,
                  }).format(parseInt(product.productDetails?.metalRate))}
                </p>
                {product.productDetails?.diamondDetails ? (
                  <p>
                    ₹
                    {new Intl.NumberFormat("en-IN", {
                      minimumFractionDigits: 2,
                    }).format(
                      parseInt(
                        product.productDetails?.diamondDetails[0]?.diamondCost
                      )
                    )}
                  </p>
                ) : (
                  <p>
                    ₹{new Intl.NumberFormat("en-IN", {
                      minimumFractionDigits: 2,
                    }).format(parseInt("0"))}
                  </p>
                )}
                <p>
                  ₹
                  {new Intl.NumberFormat("en-IN", {
                    minimumFractionDigits: 2,
                  }).format(makingCharges)}
                </p>
                {product?.productDetails?.discountValue && (
                  <div>
                    {product?.productDetails &&
                    product?.productDetails?.typeOfDiscount === "Percentage" ? (
                      <p>
                        ₹
                        {new Intl.NumberFormat("en-IN", {
                          minimumFractionDigits: 2,
                        }).format(
                          parseFloat(product?.productDetails?.discountAmount)
                        )}
                      </p>
                    ) : (
                      <p>₹{product.productDetails?.discountValue}</p>
                    )}
                  </div>
                )}
                <p>
                  ₹
                  {new Intl.NumberFormat("en-IN", {
                    minimumFractionDigits: 2,
                  }).format(parseInt(product?.productDetails?.gst))}
                </p>
              </div>
            </div>
            <div className="flex justify-between px-2 border border-[#ebe7e7] border-t-0">
              <div className="text-md font-semibold">
                <p>Total</p>
              </div>
              <div className="text-md font-semibold">
                {product?.productDetails?.discountPrice !== null ? (
                  <p>
                    ₹
                    {new Intl.NumberFormat("en-IN", {
                      minimumFractionDigits: 2,
                    }).format(parseInt(product?.productDetails?.discountPrice))}
                  </p>
                ) : (
                  <p>
                    ₹
                    {new Intl.NumberFormat("en-IN", {
                      minimumFractionDigits: 2,
                    }).format(parseInt(product?.productDetails?.productPrice))}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="p-4 border-t-2 border-[#f7f7f7]">
        <h2>
          <button
            className="flex w-full justify-between text-xl"
            onClick={() => handleToggle(5)}
          >
            Assitance
            <span className="right-0">
              <Icon.CaretDown
                size={25}
                className={`${showAccordian === 5 ? "rotate-180" : null}`}
              />
            </span>
          </button>
        </h2>
        {showAccordian === 5 ? (
          <div className="mt-4">
            <div>
              Our team is here to provide you with support. Whether you have
              questions,need advice,or require support,we're just a message or
              call away
            </div>
            <div className="flex">
              <Link href={"#!"}>
                <div className="mr-5 mt-5 text-center">
                  <IoLogoWhatsapp className="ml-5" size={30} color="#25D366" />
                  <p>Whatsapp</p>
                </div>
              </Link>
              <Link
                href="tel:+91 1800-222-225"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="mr-5 mt-5">
                  <Icon.Phone size={30} color="#e26178" weight="fill" />
                  <p>Call</p>
                </div>
              </Link>
              <Link href={"#!"}>
                <div className="mr-5 mt-5">
                  <Icon.ChatTeardropDots
                    className="ml-4"
                    size={30}
                    weight="fill"
                    color="#e26178"
                  />
                  <p>Message</p>
                </div>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Accordian;

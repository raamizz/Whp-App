"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { baseUrl } from "@/utils/constants";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Cookie from "js-cookie";
import Link from "next/link";
interface Props {
  handleComponent: (args: string) => void;
}
const MobileGms: React.FC<Props> = ({ handleComponent }) => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showAccordian, setShowAccordian] = useState<number>(1);
  const [error ,setError]=useState<any>()
  const handleToggle = (number: any) => {
    setShowAccordian(number === showAccordian ? null : number);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const cookieToken = Cookie.get("localtoken");
        const response = await axios.get(`${baseUrl}/getCustomerGMS`, {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.log("Error from Profile Gms", error);
        setError(error)
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleBackButton = (args: string) => {
    handleComponent("");
  };
  if (loading) {
    return (
      <div className="loading-container flex justify-center items-center h-full">
        <Image src="/dummy/loader.gif" alt={"loader"} height={50} width={50} />
      </div>
    );
  }
  return (
    <div>
      <div className="flex mb-4">
        <div onClick={() => handleBackButton("")} className="mt-2">
          <Icon.CaretLeft size={15} />
        </div>
        <div className="flex justify-between w-full">
          <div className="text-[20px] font-bold">Your Gms</div>
          <div className="text-[20px] font-bold text-[#e26178] underline">
            <Link href={"/benefit"}>Know More</Link>
          </div>
        </div>
      </div>
      <div className="px-3">
        {data &&
          data.map((gms: any, index: any) => (
            <div key={index} className="border mb-3">
              <div className="flex justify-between border-b px-2">
                <div>Date: {gms.enrollDate}</div>
                <div>{gms.schemeType}</div>
              </div>
              <div className="flex justify-between px-2">
                <div>Monthly Investment: {gms.monthlyAmount} </div>
                <div>Balance Amount: {gms.balanceAmount}</div>
              </div>
              <p className="px-2">Payment Status Tracking</p>

              <div className="flex mb-2 px-2 my-2">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div key={index}>
                    {/* Render your content here */}
                    <p className="text-transparent bg-[#929191] mr-2 h-[8px] w-[15px]">
                      3
                    </p>
                  </div>
                ))}
              </div>
              <button className="px-4 py-2 bg-[#e26178] text-white my-1 mr-2">
                Pay Now
              </button>
              <div
                className="flex justify-between items-center border-t"
                onClick={() => handleToggle(index)}
              >
                <div>Payment History</div>
                <div>
                  <Icon.CaretDown />
                </div>
              </div>
              {showAccordian === index && <div>Payment History</div>}
            </div>
          ))}
          {error&&<div className="text-center  font-semibold text-2xl my-10 text-[#e26178]">No Active Gold Saving Scheme</div>}
      </div>
    </div>
  );
};

export default MobileGms;

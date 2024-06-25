"use client";
import React, { useEffect, useState } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import ReactLoading from "react-loading";
import { useRouter } from "next/navigation";
import axios from "axios";
import SingleOrderDetails from "./SingleOrderDetails";
import FlashAlert from "../Other/FlashAlert";
import Cookie from "js-cookie";
import { baseUrl } from "@/utils/constants";
interface Props {
  orders: any;
}
const ProfileOrders: React.FC<Props> = ({ orders }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<any>();
  const { logOut, isLoggedIn } = useUser();
  const [singleOrder, setSingleOrder] = useState<any>([]);

  const handleLogOut = () => {
    logOut();
    router.push("/");
  };

  const handleOrderDetails = (id: any) => {
    setSingleOrder(() => {
      const matchingOrder = orders.find((order: any) => order.id === id);
      return matchingOrder ? [matchingOrder] : [];
    });
  };

  useEffect(() => setSingleOrder(orders), [orders]);

  // const handleOrderCancel = async (id: any) => {
  //   try {
  //     setLoading(true);
  //     const cookieToken = Cookie.get("localtoken");
  //     const response = await axios.post(
  //       `${baseUrl}/${id}/cancel`,
  //       {},
  //       {
  //         headers: { Authorization: `Bearer ${cookieToken}` },
  //       }
  //     );
  //     setMessage(response.data.message);
  //   } catch (error) {
  //     console.error("Error fetching orders:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleBack = () => {
    setSingleOrder(orders);
  };

  console.log(orders);

  if (!orders)
    return (
      <div className="loading-container flex justify-center items-center h-full">
        <Image src="/dummy/loader.gif" alt={"loader"} height={50} width={50} />
      </div>
    );
  return (
    <div className="p-[60px] md:p-[40px]">
      <div className="flex justify-between ">
        <div className="flex">
          {Array.isArray(singleOrder) && singleOrder.length == 1 && (
            <div
              className="mt-3 mr-2 cursor-pointer"
              onClick={() => handleBack()}
            >
              <p>
                <Icon.ArrowLeft size={25} />
              </p>
            </div>
          )}
          <div>
            <p className="text-2xl font-semibold">Order Details</p>
            <p className="text-sm text-[#dbd6d6]">View your orders</p>
          </div>
        </div>
        <div className="flex" onClick={() => handleLogOut()}>
          <span className="mt-1">
            <Icon.SignOut />
          </span>
          <p>Logout</p>
        </div>
      </div>
      {Array.isArray(singleOrder) && singleOrder.length == 0 && (<div>No Order Found</div>)}
      {Array.isArray(singleOrder) && singleOrder.length > 1 && (
        <div className="mt-10">
          {Array.isArray(orders) &&
            orders.map((item: any) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg shadow hover:bg-[#E26178] hover:bg-opacity-5 hover:scale-[1.02] hover:border-[#E26178]   mb-4 cursor-pointer"
                onClick={() => handleOrderDetails(item.id)}
              >
                <div className="flex p-4 border-b-2 justify-between">
                  <div className="flex">
                    <p>Order ID:{item.orderNo}</p>
                    <p className="bg-[#e26178] rounded-full text-transparent w-2 h-2 ml-2 mt-2">
                      1
                    </p>
                    <p className="ml-2">
                      Order Date -{" "}
                      {new Date(item.created_at).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-green-600 font-bold">
                    {item?.orderStatus}
                  </div>
                </div>
                {item.productDetails.map((product: any, index: any) => (
                  <div className="flex justify-between p-4" key={index}>
                    <div className="flex">
                    <div className="mr-3">
                      <Image
                        src={product?.imageDetails[0]?.image_path}
                        alt={"image"}
                        width={85}
                        height={85}
                        className="bg-[#f7f7f7]"
                      />
                    </div>

                    <div>
                      <p className="text-xl font-semibold">
                        {product?.displayTitle}
                      </p>
                      <p>
                        {product?.metalType}-{product?.metalWeight}
                      </p>
                      <p>Quantity:{product?.quantity}</p>
                    </div>
                    </div>
                    <div className="font-semibold">
                      ₹
                      {Intl.NumberFormat("en-IN", {
                        minimumFractionDigits: 2,
                      }).format(Math.round(parseInt(item?.discountedTotal)))}
                    </div>
                  </div>
                ))}


              </div>
            ))}
        </div>
      )}

      {Array.isArray(singleOrder) && singleOrder.length == 1 && (
        <SingleOrderDetails singleOrder={singleOrder} />
      )}
    </div>
  );
};

export default ProfileOrders;

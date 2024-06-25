"use client";
import React, { useEffect, useState } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import ReactLoading from "react-loading";
import { useRouter } from "next/navigation";
import axios from "axios";
import FlashAlert from "../Other/FlashAlert";
import Cookie from "js-cookie";
import { baseUrl } from "@/utils/constants";
import MobileSingleOrderDetails from "./MobileSingleOrderDetails";
interface Props {
  handleComponent: (args: string) => void;
  orders: any;
}
const ProfileOrders: React.FC<Props> = ({ orders, handleComponent }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<any>();
  const { logOut, isLoggedIn } = useUser();
  const [singleOrder, setSingleOrder] = useState<any>();

  const handleLogOut = () => {
    logOut();
    router.push("/");
  };
  // useEffect(() => setSingleOrder(orders), [orders]);

  const handleOrderDetails = (id: any) => {
    setSingleOrder(() => {
      const matchingOrder = orders.find((order: any) => order.id === id);
      return matchingOrder ? [matchingOrder] : [];
    });
  };
  const handleOrderCancel = async (id: any) => {
    try {
      setLoading(true);
      const cookieToken = Cookie.get("localtoken");
      const response = await axios.post(
        `${baseUrl}/${id}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${cookieToken}` },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleBackButton = (args: string) => {
    handleComponent(args);
  };
  const handleBack = () => {
    setSingleOrder(null);
  };

  if (!orders)
    return (
      <div className="loading-container flex justify-center items-center h-full">
        <Image src="/dummy/loader.gif" alt={"loader"} height={50} width={50} />
      </div>
    );
  return (
    <div className="p-[30px]">
      <div className="flex justify-between">
        <div className="flex">
          {singleOrder != null && (
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
            {singleOrder == null && (
              <p onClick={() => handleBackButton("")}>
                <Icon.ArrowLeft size={25} />
              </p>
            )}
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
      {singleOrder == null && (
        <div className="mt-10">
          {Array.isArray(orders) &&
            orders.map((item: any) => (
              <div
                key={item.id}
                className="border border-gray-200  border-b-0 mb-4 cursor-pointer"
                onClick={() => handleOrderDetails(item.id)}
              >
                <div className="flex flex-wrap p-2">
                  <p>Order ID:{item.orderNo}</p>
                  <p className="">
                    Order Date -{" "}
                    {new Date(item.created_at).toISOString().split("T")[0]}
                  </p>
                </div>
                <div className="text-green-600 font-bold p-2">
                  {item?.orderStatus}
                </div>

                {item.productDetails.map((product: any, index: any) => (
                  <div className="flex w-full border-b py-2" key={index}>
                    <div className="mr-3 flex items-center">
                      <Image
                        src={product?.imageDetails[0]?.image_path}
                        alt={"image"}
                        width={95}
                        height={95}
                        className="bg-[#f7f7f7] "
                      />
                    </div>

                    <div className="w-full">
                      <p className="text-xl font-semibold">
                        {product?.displayTitle}
                      </p>
                      <p>
                        {product?.metalType}-{product?.metalWeight}
                      </p>
                      <p>Quantity:{product.quantity}</p>
                      <div className="font-semibold">
                        ₹
                        {Intl.NumberFormat("en-IN", {
                          minimumFractionDigits: 2,
                        }).format(
                          Math.round(parseInt(product?.discountedTotal))
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      )}

      {singleOrder != null && (
        // <div>
        //   {singleOrder[0]?.productDetails.map((items: any, index: any) => (
        //     <div key={index} className="flex justify-between p-4">
        //       {items.productDetails.map((product: any, index: any) => (
        //         <div className="flex" key={index}>
        //           <div className="mr-3">
        //             <Image
        //               src={product?.imageDetails[0].image_path}
        //               alt={"image"}
        //               width={85}
        //               height={85}
        //             />
        //           </div>
        //           <div>
        //             <p className="text-xl font-semibold">
        //               {product?.displayTitle}
        //             </p>
        //             <p>
        //               {product?.metalType}-{product?.metalWeight}
        //             </p>
        //             <p>Quantity:{items?.quantity}</p>
        //           </div>
        //         </div>
        //       ))}

        //       <div className="font-semibold">
        //         ₹
        //         {Intl.NumberFormat("en-IN", {
        //           minimumFractionDigits: 2,
        //         }).format(Math.round(parseInt(items?.discountedTotal)))}
        //       </div>
        //       {items?.isReturnable && <button>Return Here</button>}
        //     </div>
        //   ))}
        //   <p className="mt-3">
        //     Billing Address:{singleOrder[0]?.billingAddressId[0]?.full_address},
        //     {singleOrder[0]?.billingAddressId[0]?.landmark},{" "}
        //     {singleOrder[0]?.billingAddressId[0]?.pincode},
        //     {singleOrder[0]?.billingAddressId[0]?.city}
        //   </p>
        //   <p className="mt-3">
        //     Shippin Address:{singleOrder[0]?.shippingAddressId[0].full_address},
        //     {singleOrder[0]?.shippingAddressId[0]?.landmardk},
        //     {singleOrder[0]?.shippingAddressId[0]?.pincode},
        //     {singleOrder[0]?.shippingAddressId[0]?.city}
        //   </p>
        //   {singleOrder[0]?.orderStatus === "4" ||
        //   singleOrder[0]?.orderStatus === "5" ? null : (
        //     <div onClick={() => handleOrderCancel(singleOrder[0]?.id)}>
        //       <button className="bg-[#e26178] text-white px-3 py-2 rounded-sm">
        //         Order Cancel
        //       </button>
        //     </div>
        //   )}
        //   {message && <FlashAlert message={message} type={"success"} />}
        // </div>
        <MobileSingleOrderDetails singleOrder={singleOrder} />
      )}
    </div>
  );
};

export default ProfileOrders;

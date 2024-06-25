import React, { useState, useEffect } from "react";
import Image from "next/image";
import FlashAlert from "../Other/FlashAlert";
import Cookie from "js-cookie";
import { baseUrl ,graphqlbaseUrl} from "@/utils/constants";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import axios from "axios";
interface Props {
  singleOrder: any;
}
const MobileSingleOrderDetails: React.FC<Props> = ({ singleOrder }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<any>();
  const [type, setType] = useState<any>("");

  const handleOrderCancel = async (id: any) => {
    try {
      setLoading(true);
      const cookieToken = Cookie.get("localtoken");
      const getAuthHeaders = () => {
        if (!cookieToken) return null;
        return {
          authorization: `Bearer ${cookieToken}`,
        };
      };

      const client = new ApolloClient({
        uri: graphqlbaseUrl,
        headers: getAuthHeaders(),
        cache: new InMemoryCache(),
      });

      const CUSTOMER_ORDER_CANCEL = gql`
        mutation Mutation($customerOrder: CustomerOrderInput!) {
          CancelCustomerOrder(customerOrder: $customerOrder) {
            message
            code
          }
        }
      `;
      const { data } = await client.mutate({
        mutation: CUSTOMER_ORDER_CANCEL,
        variables: {
          customerOrder: {
            orderId: id,
          },
        },
        context: {
          headers: getAuthHeaders(),
        },
        fetchPolicy: "no-cache",
      });
      if (data.CancelCustomerOrder.code == 200) {
        setMessage(data.CancelCustomerOrder.message);
        setType("success");
      } else {
        setMessage(data.CancelCustomerOrder.message);
        setType("error");
      }
    } catch (error: any) {
      console.error("Error fetching orders:", error);
      setMessage(error.response.data.message);
      setType("error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <p className="mt-4">
        Order No.:{" "}
        <span className="font-bold text-lg">{singleOrder[0].orderNo}</span>
      </p>
      <div className="flex">
        <p className="mr-1">Tracking Status:</p>
        <p className="text-green-600 font-bold text-lg">
          {singleOrder[0]?.orderStatus}
        </p>
      </div>

      {singleOrder?.map((items: any, index: any) => (
        <div
          key={index}
          className=" p-4 border border-gray items-center"
        >
          {items.productDetails.map((product: any, index: any) => (
            <div className="flex justify-between border-b" key={index}>
              <div className="flex">
              <div className="mr-3">
                <Image
                  src={product?.imageDetails[0].image_path}
                  alt={"image"}
                  width={85}
                  height={85}
                  className="bg-[#f7f7f7]"
                />
              </div>

              <p className=" font-semibold">{product?.displayTitle}</p>
              </div>
              <div className="font-semibold">
                ₹
                {Intl.NumberFormat("en-IN", {
                  minimumFractionDigits: 2,
                }).format(
                  Math.round(
                    parseInt(product?.discountedTotal) * parseInt(product?.quantity)
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
      <div className="flex justify-end border-gray border border-b-0 border-t-0 px-2 ">
        Discount Amount:{singleOrder[0]?.productDetails[0]?.discountAmount}
      </div>
      <div className="flex justify-end border-gray border border-b-0 border-t-0 px-2 ">
        Shipping Charges:{singleOrder[0]?.productDetails[0]?.discountAmount}
      </div>
      <div className="flex justify-end border-gray border rounded-b-md p-2">
        <p>Total Amount: </p>
        <span className="font-semibold text-md">
          ₹
          {Intl.NumberFormat("en-IN", {
            minimumFractionDigits: 2,
          }).format(Math.round(singleOrder[0]?.productTotal))}
        </span>
      </div>
      <div>
        <div className="border border-gray mb-2 mt-4 rounded-md ">
          <p className=" border-gray border-b p-2 font-semibold">
            Billing Address
          </p>
          <p className="w-full border-gray border-b p-2 break-words">
            {singleOrder[0]?.billingAddressId[0]?.full_address},
            {singleOrder[0]?.billingAddressId[0]?.landmark},
            {singleOrder[0]?.billingAddressId[0]?.pincode},
            {singleOrder[0]?.billingAddressId[0]?.state},
            {singleOrder[0]?.billingAddressId[0]?.city}
            <p>
              Address Type:{singleOrder[0]?.billingAddressId[0]?.address_type}
            </p>
          </p>
          <p className="border-gray border-b p-2 font-semibold">
            Shipping Address
          </p>
          <p className="p-2 break-words">
            {singleOrder[0]?.shippingAddressId[0].full_address},
            {singleOrder[0]?.shippingAddressId[0]?.landmark},
            {singleOrder[0]?.shippingAddressId[0]?.pincode},
            {singleOrder[0]?.shippingAddressId[0]?.state},
            {singleOrder[0]?.shippingAddressId[0]?.city}
            <p>
              Address Type:{singleOrder[0]?.shippingAddressId[0]?.address_type}
            </p>
          </p>
        </div>
        <div className="border border-gray mb-2 mt-4 ml-2 rounded-md">
          <p className=" border-gray border-b font-semibold p-2 mb-2">
            Payment Details
          </p>
          <p className="px-2">Order Date:{singleOrder[0]?.payments[0]?.date}</p>
          <p className="px-2">
            Payment Method: {singleOrder[0]?.payments[0]?.paymentMethod}
          </p>
          <p className="px-2 break-words">
            Transaction No.: {singleOrder[0]?.payments[0]?.transactionNo}
          </p>
          <p className="px-2">
            Amount: ₹
            {Intl.NumberFormat("en-IN", {
              minimumFractionDigits: 2,
            }).format(Math.round(singleOrder[0]?.payments[0]?.amount))}
          </p>
          <p className="px-2">
            Payment Status:{" "}
            <span className="font-bold text-md">
              {singleOrder[0]?.paymentStatus}
            </span>
          </p>
        </div>
        <div className="border border-gray mb-2 mt-4 ml-2 rounded-md max-md:col-span-2">
          <p className=" border-gray border-b font-semibold p-2 mb-2">
            Order Tracking
          </p>
        </div>
      </div>

      {singleOrder[0]?.orderStatus === "4" ||
        singleOrder[0]?.orderStatus === "5" ? null : (
        <div onClick={() => handleOrderCancel(singleOrder[0]?.id)}>
          <button className="bg-[#e26178] text-white px-3 py-2 pr-[6px] rounded-sm">
            Order Cancel
          </button>
        </div>
      )}
      {message && <FlashAlert message={message} type={type} />}
    </div>
  );
};

export default MobileSingleOrderDetails;

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { baseUrl, graphqlbaseUrl } from "@/utils/constants";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import Cookie from "js-cookie";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";

const ProfileGMS = () => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showAccordian, setShowAccordian] = useState<number>(1);
  const [error, setError] = useState<any>();
  const handleToggle = (number: any) => {
    setShowAccordian(number === showAccordian ? null : number);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const cookieToken = Cookie.get("localtoken");
        const getAuthHeaders = () => {
          if (!cookieToken) return null;
          return {
            authorization: `Bearer ${cookieToken}`,
          };
        };
        const link = new HttpLink({
          uri: graphqlbaseUrl,
          headers: getAuthHeaders(),
        });

        const client = new ApolloClient({
          link,
          cache: new InMemoryCache(),
        });

        const GET_GMS = gql`
          query GetCustomerGMS($token: String!) {
            getCustomerGMS(token: $token) {
              id
              customerId
              schemeType
              monthlyAmount
              discountAmount
              balanceAmount
              totalAmount
              enrollDate
            }
          }
        `;

        const variables = { token: cookieToken };
        const { data } = await client.query({
          query: GET_GMS,
          variables,
        });
        setData(data.getCustomerGMS);
      } catch (error) {
        console.error("Error fetching GMs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const cookieToken = Cookie.get("localtoken");
  //       const response = await axios.get(`${baseUrl}/getCustomerGMS`, {
  //         headers: {
  //           Authorization: `Bearer ${cookieToken}`,
  //         },
  //       });
  //       setData(response.data);
  //     } catch (error) {
  //       console.log("Error from Profile Gms", error);
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);
  if (loading) {
    return (
      <div className="loading-container flex justify-center items-center h-full">
        <Image src="/dummy/loader.gif" alt={"loader"} height={50} width={50} />
      </div>
    );
  }
  return (
    <div className="px-[60px] py-[30px]">
      <div className="flex justify-between mb-3">
        <div className="text-xl font-bold">Profile GMS</div>
        <div className="text-xl font-bold underline text-[#e26178]">
          <Link href={"/benefit"}>Know More</Link>
        </div>
      </div>
      <div>
        {data &&
          data.length > 0 &&
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
              <button className="px-4 py-2 bg-[#e26178] text-white my-2 mr-2">
                Pay Now
              </button>
              <div className="flex mb-2 px-2">
                {Array.from({ length: 11 }).map((_, index) => (
                  <div key={index}>
                    {/* Render your content here */}
                    <p className="text-transparent bg-[#929191] mr-3 h-[10px] w-[20px]">
                      3
                    </p>
                  </div>
                ))}
              </div>

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
        {error && (
          <div className="text-center  font-semibold text-2xl my-10 text-[#e26178]">
            No Active Gold Saving Scheme
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileGMS;

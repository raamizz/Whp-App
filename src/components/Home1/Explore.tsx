"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { baseUrl, getSubBanners, graphqlbaseUrl } from "@/utils/constants";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
import axios from "axios";
const Explore = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSubBanners = async () => {
      try {
        setLoading(true);
        const client = new ApolloClient({
          uri: graphqlbaseUrl,
          cache: new InMemoryCache(),
        });
        const GET_ALLSUBBANNERS = gql`
          query GetAllSubBanners {
            getAllSubBanners {
              id
              parentTitle
              title
              url
              image
            }
          }
        `;
        const { data } = await client.query({
          query: GET_ALLSUBBANNERS,
        });

        setData(data.getAllSubBanners);
        console.log("Datta", data.getAllSubBanners);
      } catch (error) {
        console.log("Error in fetching SubBanners", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubBanners();
  }, []);

  // useEffect(() => {
  //   const fetchSubBanners = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axios.get(`${baseUrl}${getSubBanners}`);
  //       setData(response.data.subbanners);
  //     } catch (error) {
  //       console.log("Error Occured", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchSubBanners();
  // }, []);
  useEffect(() => {
    console.log("SubBAnners", data);
  }, [data]);
  if (loading) {
    return (
      <div>
        <Skeleton height={300} />
      </div>
    );
  }
  return (
    <>
      <div className="banner-block style-one grid sm:grid-cols-2">
        {data &&
          data?.map((item: any) => (
            <div key={item.id}>
              <Link
                href={item.url}
                className="banner-item relative block overflow-hidden duration-500"
              >
                <div className="banner-img">
                  <Image
                    src={item.image}
                    width={2000}
                    height={1300}
                    alt="banner1"
                    className="duration-1000"
                  />
                </div>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
};

export default Explore;

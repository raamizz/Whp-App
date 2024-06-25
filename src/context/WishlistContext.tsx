"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import instance from "@/utils/axios";
import axios from "axios";
import { useUser } from "./UserContext";
import {
  baseUrl,
  addwishlist,
  removewishlist,
  getwishlisted,
} from "@/utils/constants";
import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";
import { graphqlbaseUrl } from "@/utils/constants";
import Cookies from "js-cookie";
import {
  ProductType,
  ProductForWishlistLoggedIn,
  ProductForWishlistLoggedOut,
} from "@/type/ProductType";

interface WishlistItem {
  productId: number;
  title: string;
  productPrice: string;
  discountPrice: string;
  discountValue: string;
  image_path: string;
  imageDetails: any;
  url: string;
}

interface WishlistContextProps {
  wishlistItems: WishlistItem[];
  addToWishlist: (productType: ProductType) => Promise<void>;
  removeFromWishlist: (productId: number) => Promise<void>;
  getWishlist: () => Promise<WishlistItem[]>;
  wishlistItemsCount: number;
  setWishlistItems: React.Dispatch<React.SetStateAction<WishlistItem[]>>;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(
  undefined
);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [wishlistItemsCount, setWishlistItemsCount] = useState(0);
  const { isLoggedIn } = useUser();
  const [flashMessage, setFlashMessage] = useState<string | null>(null);
  const [flashType, setFlashType] = useState<"success" | "error" | "info">(
    "info"
  );
  const cookieToken = Cookies.get("localtoken");

  useEffect(() => {
    const uniqueWishlistItems = wishlistItems.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.productId === item.productId)
    );
    setWishlistItemsCount(uniqueWishlistItems.length);
  }, [wishlistItems]);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     const userToken = Cookies.get("localtoken");
  //     if (userToken) {
  //       // setIsLoggedIn(true);
  //       setCookieToken(userToken);
  //     }
  //   }
  // }, [isLoggedIn]);



  useEffect(() => {
    console.log("useEffect hook called");

    const fetchWishlistItems = async () => {
      try {
        let localWishlistItems = [];
        if (typeof window !== "undefined") {
          localWishlistItems = JSON.parse(
            localStorage.getItem("wishlistItems") || "[]"
          );
        }

        const wishlistData = await getWishlist();
        console.log("wishlistData:", wishlistData);

        if (isLoggedIn && localWishlistItems.length > 0) {
          const serverProductIds = wishlistData.map(
            (item: any) => item.productId
          );
          const itemsToAdd = localWishlistItems.filter(
            (item: any) => !serverProductIds.includes(item.productId)
          );

          if (itemsToAdd.length > 0) {

            const productIds = itemsToAdd.map((item: any) => [{ productId: item.productId }]);

            const productWishlistIds = productIds.flat();


            const getAuthHeaders: any = () => {
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

            const SYNC_WISHLIST = gql`mutation AddOrUpdateWishlist($wishlist: [WishlistInput!]!) {
            AddOrUpdateWishlist(wishlist: $wishlist) {
              message
            }
          }`;

            const { data } = await client.mutate({
              mutation: SYNC_WISHLIST,
              variables: {
                wishlist: productWishlistIds,
              },
              context: {
                headers: getAuthHeaders(),
              },
              fetchPolicy: "no-cache",
            });
            // const addPromises = itemsToAdd.map((item: any) =>
            //   instance.get(`${baseUrl}${addwishlist}`, {
            //     params: { productId: item.productId },
            //     headers: {
            //       Authorization: `Bearer ${cookieToken}`,
            //     },
            //   })
            // );
            // await Promise.all(addPromises);
            localStorage.removeItem("wishlistItems");
          }
        }
        setWishlistItems(wishlistData);
      } catch (error) {
        console.error("Error fetching or adding wishlist items:", error);
      }
    };

    fetchWishlistItems();
  }, [isLoggedIn, cookieToken]);
   
  const normalizeImagePath = (
    imagePath: string | string[] | undefined
  ): string => {
    if (!imagePath) {
      return "";
    }
    if (Array.isArray(imagePath)) {
      return imagePath.length > 0 ? imagePath[0] : "";
    }
    return imagePath;
  };

  const addToWishlist = async (
    product:
      | ProductType
      | ProductForWishlistLoggedIn
      | ProductForWishlistLoggedOut
  ) => {
    try {
      if (typeof window !== "undefined") {
        if (isLoggedIn) {
          let localWishlistItems = null;
          if (typeof window !== "undefined") {
            localWishlistItems = JSON.parse(
              localStorage.getItem("wishlistItems") || "[]"
            );
          }
          const dbWishlistItems = await getWishlist();
          const localItemsToAdd = localWishlistItems.filter(
            (item: WishlistItem) =>
              !dbWishlistItems.some(
                (dbItem) => dbItem.productId === item.productId
              )
          );

          // const promises = localItemsToAdd.map((item: any) =>
          //   instance.get(`${baseUrl}${addwishlist}`, {
          //     params: { productId: item.productId },
          //     headers: {
          //       Authorization: `Bearer ${cookieToken}`,
          //     },
          //   })
          // );

          // await Promise.all(promises);
          // await instance.get(`${baseUrl}${addwishlist}`, {
          //   params: { productId: product.productId },
          //   headers: {
          //     Authorization: `Bearer ${cookieToken}`,
          //   },
          // });
          console.log(product, "product");

          console.log(product, "product");

          const getAuthHeaders: any = () => {
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

          const SYNC_WISHLIST = gql`mutation 
          AddOrUpdateWishlist($wishlist: [WishlistInput!]!) {
            AddOrUpdateWishlist(wishlist: $wishlist) {
              message
            }
          }`;

          const { data } = await client.mutate({
            mutation: SYNC_WISHLIST,
            variables: {
              wishlist: [
                {
                  productId: product.productId,
                }
              ],
            },
            context: {
              headers: getAuthHeaders(),
            },
            fetchPolicy: "no-cache",
          });

          const updatedDbWishlist = await getWishlist();

          const mergedWishlist = [
            ...updatedDbWishlist,
            ...localWishlistItems.filter(
              (item: any) =>
                !updatedDbWishlist.some(
                  (dbItem) => dbItem.productId === item.productId
                )
            ),
          ];
          setWishlistItems(mergedWishlist);
          {
            typeof window !== "undefined" &&
              localStorage.setItem(
                "wishlistItems",
                JSON.stringify(mergedWishlist)
              );
          }
        } else {
          {
            let localWishlistItems = null;
            if (typeof window !== "undefined") {
              localWishlistItems = JSON.parse(
                localStorage.getItem("wishlistItems") || "[]"
              );
            }
            const isProductInLocalStorage = localWishlistItems.some(
              (item: any) => item.productId === product.productId
            );

            if (!isProductInLocalStorage) {
              const updatedWishlistItems = [
                ...localWishlistItems,
                {
                  productId: product.productId,
                  title: product.title,
                  productPrice: product.productPrice,
                  discountPrice: product.discountPrice,
                  discountValue: product.discountValue,
                  image_path: normalizeImagePath(product.image_path),
                  url: product.url,
                },
              ];

              localStorage.setItem(
                "wishlistItems",
                JSON.stringify(updatedWishlistItems)
              );

              setWishlistItems(updatedWishlistItems);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      setFlashMessage("Failed to add product to wishlist.");
      setFlashType("error");
    }
  };

  const removeFromWishlist = async (productId: number) => {
    try {
      if (isLoggedIn) {
        // await instance.get(`${baseUrl}${removewishlist}`, {
        //   params: { productId },
        //   headers: {
        //     Authorization: `Bearer ${cookieToken}`,
        //   },
        // });
        const getAuthHeaders: any = () => {
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

        const SYNC_WISHLIST = gql`mutation DeleteWishlist($wishlist: [WishlistInput!]!) {
          DeleteWishlist(wishlist: $wishlist) {
            message
          }
        }`;

        const { data } = await client.mutate({
          mutation: SYNC_WISHLIST,
          variables: {
            wishlist: [
              {
                productId: productId,
              }
            ],
          },
          context: {
            headers: getAuthHeaders(),
          },
          fetchPolicy: "no-cache",
        });
      }

      const updatedWishlistItems = wishlistItems.filter(
        (item) => item.productId !== productId
      );
      {
        typeof window !== "undefined" &&
          localStorage.setItem(
            "wishlistItems",
            JSON.stringify(updatedWishlistItems)
          );
      }
      // localStorage.setItem(
      //   "wishlistItems",
      //   JSON.stringify(updatedWishlistItems)
      // );
      setWishlistItems(updatedWishlistItems);
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };

  const getWishlist = async (): Promise<WishlistItem[]> => {
    try {
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

      const GET_CUSTOMER_WISHLIST = gql`
        query GetCustomerWishlist($token: String!) {
          getCustomerWishlist(token: $token) {
            productId
            productAmount
            quantity
            url
            SKU
            variantId
            productTotal
            metalType
            metalWeight
            discountAmount
            discountValue
            typeOfDiscount
            discountedTotal
            displayTitle
            productPrice
            discountPrice
            mediaId
            imageDetails {
              image_path
              order
              alt_text
            }
            videoDetails {
              video_path
              order
              alt_text
            }
            rating
          }
        }
      `;

      if (isLoggedIn) {
        const variables = { token: cookieToken };
        const { data } = await client.query({
          query: GET_CUSTOMER_WISHLIST,
          variables,
          // context: {
          //   headers: getAuthHeaders(),
          // },
        });

        return data.getCustomerWishlist.map((item: any) => ({
          productId: item.productId,
          title: item.displayTitle,
          productPrice: item.productPrice,
          discountPrice: item.discountPrice,
          discountValue: item.discountValue,
          image_path: item.imageDetails[0]?.image_path || "",
          url: item.url,
        }));
      } else {
        let localWishlistItems = [];
        if (typeof window !== "undefined") {
          localWishlistItems = JSON.parse(
            localStorage.getItem("wishlistItems") || "[]"
          );
        }
        return localWishlistItems;
      }
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
      return [];
    }
  };

  const value: WishlistContextProps = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    getWishlist,
    setWishlistItems,
    wishlistItemsCount: wishlistItems.length,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
      {/* <FlashAlert message={flashMessage} type={flashType} /> */}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

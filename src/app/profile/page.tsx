"use client";
import React, { useEffect, useState } from "react";
import StickyNav from "@/components/Header/StickyNav";
import ProfileSidebar from "@/components/Profile/ProfileSideBar";
import ProfileDetails from "@/components/Profile/ProfileDetails";
import ProfileOrders from "@/components/Profile/ProfileOrder";
import ProfileWishList from "@/components/Profile/ProfileWishList";
import ProfileGMS from "@/components/Profile/ProfileGMS";
import MobileProfileSideBar from "@/components/Profile/MobileProfileSideBar";
import MobilePersonalInformation from "@/components/Profile/MobilePersonalInformation";
import MobileWishList from "@/components/Profile/MobileWishList";
import MobileOrders from "@/components/Profile/MobileOrders";
import MobileGms from "@/components/Profile/MobileGms";
import axios from "axios";
import Cookie from "js-cookie";
import { baseUrl, getOrders, graphqlbaseUrl } from "@/utils/constants";
import { useUser } from "@/context/UserContext";
import ProtectedRoute from "../ProtectedRoute";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";

interface OrdersResponse {
  customerOrders: any;
  data: any;
}
const ProfilePage = () => {
  const [componentToRender, setComponentToRender] =
    useState<string>("personalInfo");
  const [component, setComponent] = useState<string>("");
  const [ordersData, setOrdersData] = useState<any>();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const handleComponentToRender = (component: string) => {
    setComponentToRender(component);
  };
  const handleComponent = (component: string) => {
    setComponent(component);
  };
  const { isLoggedIn, getUser } = useUser();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 540px)");

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getUser();
    }
  }, []);
  
  const handleOrders = async () => {
    try {
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

      const GET_ORDER = gql`
      query GetCustomerOrder($token: String!) {
        getCustomerOrder(token: $token) {
          id
          customerId
          couponId
          created_at
          orderNo
          razorpayOrderNo
          productTotal
          discountedTotal
          balanceAmount
          paymentStatus
          orderStatus
          productDetails {
            productId
            productAmount
            quantity
            productTotal
            discountAmount
            discountedTotal
            displayTitle
            productPrice
            discountPrice
            metalType
            metalWeight
            imageDetails {
              image_path
              order
              alt_text
            }
          }
          billingAddressId {
            address_id
            customer_id
            address_type
            full_address
            country
            state
            city
            landmark
            pincode
          }
          shippingAddressId {
            address_id
            customer_id
            address_type
            full_address
            country
            state
            city
            landmark
            pincode
          }
          payments {
            paymentId
            orderId
            date
            paymentMethod
            transactionNo
            amount
          }
        }
      }
      `;

      const variables = { token: cookieToken };
      const { data } = await client.query({
        query: GET_ORDER,
        variables,
      });
      setOrdersData(data.getCustomerOrder);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  if (isMobile) {
    return (
      <ProtectedRoute>
        <div>
          <StickyNav />
          {component === "" && (
            <MobileProfileSideBar
              handleComponent={handleComponent}
              componentName={component}
              handleOrder={handleOrders}
            />
          )}
          {component === "personalInfo" && (
            <MobilePersonalInformation handleComponent={handleComponent} />
          )}
          {component === "orders" && (
            <MobileOrders
              orders={ordersData}
              handleComponent={handleComponent}
            />
          )}
          {component === "wishlist" && (
            <MobileWishList handleComponent={handleComponent} />
          )}
          {component === "gms" && (
            <MobileGms handleComponent={handleComponent} />
          )}
        </div>
      </ProtectedRoute>
    );
  }
  return (
    <>
      <ProtectedRoute>
        <div className="flex">
          <div className="lg:w-96 md:w-56">
            <ProfileSidebar
              handleComponent={handleComponentToRender}
              componentName={componentToRender}
              handleOrder={handleOrders}
            />
          </div>
          <div className="w-screen ">
            {componentToRender === "personalInfo" && <ProfileDetails />}
            {componentToRender === "orders" && (
              <ProfileOrders orders={ordersData} />
            )}
            {componentToRender === "wishlist" && <ProfileWishList />}
            {componentToRender === "gms" && <ProfileGMS />}
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
};

export default ProfilePage;

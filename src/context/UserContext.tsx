"use client";

import React, { createContext, useContext, useReducer, useState } from "react";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
import { graphqlbaseUrl } from "@/utils/constants";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { createUploadLink } from "apollo-upload-client";

interface UserState {
  isLoggedIn: boolean;
}

type UserAction = { type: "LOG_IN" } | { type: "LOG_OUT" };

interface UserContextProps {
  userState: UserState;
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
  addUserDetails: (details: FormValues) => Promise<string>;
  userDetails: UserDetails | null;
  getUser: () => Promise<void>;
}

interface UserDetails {
  customer_id: string;
  fullname: string;
  firstname: string;
  lastname: string;
  email: string;
  mobile_no: string;
  altPhone: string;
  dob: string;
  gender: string;
  profile_picture: string | null;
  wallet_amount: number;
}

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  altPhone: string;
  gender: string;
  dobDay: string;
  dobMonth: string;
  dobYear: string;
  profile_picture: File | null;
}

const initialState: UserState = {
  isLoggedIn:
    typeof window !== "undefined" &&
    localStorage.getItem("isLoggedIn") === "true",
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "LOG_IN":
      if (typeof window !== "undefined") {
        localStorage.setItem("isLoggedIn", "true");
      }
      return { isLoggedIn: true };
    case "LOG_OUT":
      if (typeof window !== "undefined") {
        localStorage.setItem("isLoggedIn", "false");
      }
      return { isLoggedIn: false };
    default:
      return state;
  }
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userState, dispatch] = useReducer(userReducer, initialState);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const router = useRouter();
  const cookieToken = Cookies.get("localtoken");

  const logIn = async () => {
    dispatch({ type: "LOG_IN" });
    await getUser();

    const redirectPath = localStorage.getItem("redirectPath") || "/";
    router.push(redirectPath);
    localStorage.removeItem("redirectPath");
  };

  const logOut = () => {
    localStorage.clear();
    window.location.href = "/";
    dispatch({ type: "LOG_OUT" });
  };

  const getAuthHeaders = (): Record<string, string> | undefined => {
    if (!cookieToken) return undefined;
    return {
      authorization: `Bearer ${cookieToken}`,
    };
  };

  const client = new ApolloClient({
    link:new  HttpLink({
      uri: graphqlbaseUrl,
      headers: getAuthHeaders(),
    }),
    cache: new InMemoryCache(),
  });

  const getUser = async () => {
    const GET_CUSTOMER_DETAILS = gql`
      query GetCustomerDetails($token: String!) {
        getCustomerDetails(token: $token) {
          customer_id
          fullname
          firstname
          lastname
          email
          mobile_no
          altPhone
          dob
          gender
          profile_picture
          wallet_amount
        }
      }
    `;
    const variables = { token: cookieToken };

    try {
      const { data } = await client.query({
        query: GET_CUSTOMER_DETAILS,
        variables,
      });
      setUserDetails(data.getCustomerDetails);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const addUserDetails = async (details: FormValues): Promise<string> => {
    try {
      const STORE_CUSTOMER_DETAILS = gql`
        mutation StoreCustomerDetails($customerDetails: CustomerDetailsInput!) {
          StoreCustomerDetails(customerDetails: $customerDetails) {
            message
          }
        }
      `;

      const dob = details.dob;
      const [dobDay, dobMonth, dobYear] = dob?.split("-") ?? ["", "", ""];

      const customerDetails = {
        firstName: details.firstName,
        lastName: details.lastName,
        email: details.email,
        altPhone: details.altPhone,
        gender: details.gender,
        dob: `${dobDay}-${dobMonth}-${dobYear}`,
        profile_picture: details.profile_picture as File,
      };

      const { data } = await client.mutate({
        mutation: STORE_CUSTOMER_DETAILS,
        variables: {
          customerDetails: customerDetails,
        },
        context: {
          headers: getAuthHeaders(),
        },
        fetchPolicy: "no-cache",
      });

      console.log("Response from backend:", data);
      await getUser();
      return data.StoreCustomerDetails.message;
    } catch (error) {
      console.error("Error adding user details:", error);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        userState,
        isLoggedIn: userState.isLoggedIn,
        logIn,
        logOut,
        addUserDetails,
        userDetails,
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

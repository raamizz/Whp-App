"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
import { graphqlbaseUrl, baseUrl, updateProfile } from "@/utils/constants";
import instance from "@/utils/axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface UserState {
  isLoggedIn: boolean;
}

type UserAction = { type: "LOG_IN" } | { type: "LOG_OUT" };

interface UserContextProps {
  userState: UserState;
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
  addUserDetails: (details: UserDetails) => Promise<void>;
  userDetails: UserDetails | null;
  getUser: () => Promise<void>;
}

interface UserDetails {
  firstname: string;
  lastname: string;
  email: string;
  mobile_no: string;
  alternatePhone: string;
  gender: string;
  dateOfBirth: string;
  profile_picture: File | null;
  customer: any;
}

type UserDetailsKeys = keyof UserDetails;

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
  const cookieToken = localStorage.getItem("localtoken");

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

  const getUser = async () => {
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

  const addUserDetails = async (details: UserDetails) => {
    const formData = new FormData();

    Object.keys(details).forEach((key) => {
      const typedKey = key as UserDetailsKeys;
      formData.append(typedKey, details[typedKey] as any);
    });

    try {
      const response = await instance.post(
        `${baseUrl}${updateProfile}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      await getUser();
      return response.data;
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

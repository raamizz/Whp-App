import { useState } from "react";
import instance from "@/utils/axios";
import { baseUrl, gms } from "@/utils/constants";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { graphqlbaseUrl } from "@/utils/constants";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

interface Props {
  setBackendMessage: (item: string) => any;
  setBackendError: (item: string) => any;
  setFlashType: (item: string) => any;
}
interface UseEnrollReturn {
  handleEnroll: (schemeType: any, amount: any) => Promise<void>;
  loading: boolean;
}
const useEnroll = ({
  setBackendMessage,
  setBackendError,
  setFlashType,
}: Props): UseEnrollReturn => {
  const [loading, setLoading] = useState(false);
  const cookieToken = Cookies.get("localtoken");
  const { isLoggedIn } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const handleEnroll = async (schemeType: any, amount: any) => {
    if (!isLoggedIn) {
      setLoading(true);
      localStorage.setItem("redirectPath", pathname);
      router.push("/login");
      return;
    }

    try {
      setLoading(true);
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

      const ADD_CUSTOMER_GMS = gql`
        mutation StoreCustomerGMS($customerGms: CustomerGMSInput!) {
          StoreCustomerGMS(customerGMS: $customerGms) {
            message
            code
          }
        }
      `;
      const { data } = await client.mutate({
        mutation: ADD_CUSTOMER_GMS,
        variables: {
          customerGms: {
            schemeType: schemeType,
            amount: amount,
          },
        },
        context: {
          headers: getAuthHeaders(),
        },
        fetchPolicy: "no-cache",
      });
      if (data.StoreCustomerGMS.code == 200) {
        console.log("Enrollment successful", data.StoreCustomerGMS.message);
        setBackendMessage(data.StoreCustomerGMS.message);
        setFlashType("success");
      } else {
        console.log("Enrollment successful", data.StoreCustomerGMS.message);
        setBackendMessage(data.StoreCustomerGMS.message);
        setFlashType("error");
      }
    } catch (error) {
      console.error("Error during enrollment", error);
      setBackendError("Failed to enroll. Please try again later.");
      setFlashType("error");
    } finally {
      setLoading(false);
    }
  };

  return { handleEnroll, loading };
};

export default useEnroll;

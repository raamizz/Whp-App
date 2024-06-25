import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl, graphqlbaseUrl } from "@/utils/constants";
import { FaCheckCircle, FaEdit, FaTimes } from "react-icons/fa";
import Preloader from "@/components/Other/Preloader";
import Loading from "./loading";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";

interface Address {
  address_id: number;
  customer_id: number;
  address_type: string;
  full_address: string;
  country: string;
  state: string;
  city: string;
  landmark: string | null;
  pincode: number;
  created_at: string;
  updated_at: string;
}

interface BillingAddressListProps {
  onAddressSelect: (address: Address) => void;
  selectedAddress: Address | null;
  addressAdded: boolean;
  onAddressAdded: (value: boolean) => void;
}

const BillingAddressList: React.FC<BillingAddressListProps> = ({
  onAddressSelect,
  selectedAddress,
  addressAdded,
  onAddressAdded,
}) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const cookieTokenn = Cookies.get("localtoken");

        const getAuthHeaders = () => {
          if (!cookieTokenn) return null;
          return {
            authorization: `Bearer ${cookieTokenn}`,
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

        const GET_ADDRESS = gql`
          query GetCustomerAddresses($token: String!) {
            getCustomerAddresses(token: $token) {
              address_id
              address_type
              city
              country
              customer_id
              full_address
              landmark
              pincode
              state
            }
          }
        `;
        const variables = { token: cookieTokenn };
        const { data } = await client.query({
          query: GET_ADDRESS,
          variables,
        });

        setAddresses(data.getCustomerAddresses);
      } catch (error) {
        console.log("Error in address fetching", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [addressAdded]);
  // useEffect(() => {
  //   const fetchAddresses = async () => {
  //       setIsLoading(true);
  //       console.log('loader loaded');

  //     try {
  //       const cookieTokenn = Cookies.get('localtoken');
  //       const response = await axios.get<{ customerAddress?: Address[] }>(`${baseUrl}/customer/getAddresses`, {
  //         headers: {
  //           Authorization: `Bearer ${cookieTokenn}`,
  //         },
  //       });

  //       if (response.data && response.data.customerAddress) {
  //         const billingAddresses = response.data.customerAddress.filter(
  //           (address) => address.address_type === 'billing'
  //         );
  //         setAddresses(billingAddresses);
  //       } else {
  //         console.error('Unexpected API response format');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching addresses:', error);
  //     }
  //     finally{
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchAddresses();
  // }, [addressAdded]);

  useEffect(() => {
    if (addressAdded) {
      onAddressAdded();
    }
  }, [addressAdded, onAddressAdded]);

  const handleAddressSelect = (address: Address) => {
    onAddressSelect(address);
  };

  return (
    <div>
      <h2 className="mb-4 text-xl">Billing Address</h2>
      {isLoading ? (
        <Loading />
      ) : addresses.length === 0 ? (
        <p>No shipping addresses found.</p>
      ) : (
        <div>
          {addresses.map((address) => (
            <div
              key={address.address_id}
              className={`border rounded-lg p-4 mb-4 flex items-center justify-between ${
                selectedAddress?.address_id === address.address_id
                  ? "bg-gray-200"
                  : ""
              } cursor-pointer`}
              onClick={() => handleAddressSelect(address)}
            >
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">
                    {address.full_address.split(",")[0]}
                  </h3>
                  {selectedAddress?.address_id === address.address_id && (
                    <FaCheckCircle className="text-green-500 text-xl" />
                  )}
                </div>
                <p>{address.full_address.split(",").slice(1).join(", ")}</p>
                <p>{`${address.city}, ${address.state}, ${address.country} - ${address.pincode}`}</p>
                <p>Address Type: {address.address_type}</p>
              </div>
              <div className="flex space-x-2">
                <FaEdit className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                <FaTimes className="text-gray-500 hover:text-gray-700 cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BillingAddressList;

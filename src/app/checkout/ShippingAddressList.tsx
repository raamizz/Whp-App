import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl, graphqlbaseUrl } from "@/utils/constants";
import { FaCheckCircle, FaEdit, FaTimes } from "react-icons/fa";
import Preloader from "@/components/Other/Preloader";
import Loading from "../benefit/loding";
import { Address } from "@/type/AddressType";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";

interface ShippingAddressListProps {
  onAddressSelect: (address: Address) => void;
  selectedAddress?: Address | null;
  addressAdded?: boolean;
  onAddressAdded: () => void;
  readOnly?: any;
}

const ShippingAddressList: React.FC<ShippingAddressListProps> = ({
  onAddressSelect,
  selectedAddress,
  addressAdded,
  onAddressAdded,
  readOnly,
}) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const fetchAddresses = async () => {
  //     setIsLoading(true);
  //     try {
  //       const cookieTokenn = localStorage.getItem("localtoken");
  //       const response = await axios.get<{ customerAddress?: Address[] }>(
  //         `${baseUrl}/customer/getAddresses`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${cookieTokenn}`,
  //           },
  //         }
  //       );

  //       if (response.data && response.data.customerAddress) {
  //         const shippingAddresses = response.data.customerAddress.filter(
  //           (address) => address.address_type !== "billing"
  //         );
  //         setAddresses(shippingAddresses);
  //       } else {
  //         console.error("Unexpected API response format");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching addresses:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchAddresses();
  // }, [addressAdded]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const cookieTokenn = localStorage.getItem("localtoken");

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

  useEffect(() => {
    if (addressAdded) {
      onAddressAdded(); // Call the onAddressAdded function when a new address is added
    }
  }, [addressAdded, onAddressAdded]);

  const handleAddressSelect = (address: Address) => {
    onAddressSelect(address);
  };
  useEffect(() => {
    console.log("All Addresssss", addresses);
  }, [addresses]);
  const sortedAddresses = addresses.slice();
  if (selectedAddress) {
    sortedAddresses.sort((a, b) => {
      if (a.address_id === selectedAddress.address_id) return -1;
      if (b.address_id === selectedAddress.address_id) return 1;
      return 0;
    });
  }

  return (
    <div>
      <h2 className="mb-4 text-xl">Shipping Address</h2>
      {isLoading ? (
        <Loading />
      ) : addresses.length === 0 ? (
        <p>No shipping addresses found.</p>
      ) : (
        <div>
          {sortedAddresses.map((address) => (
            <div
              key={address.address_id}
              className={`border rounded-lg p-4 mb-4 flex items-center justify-between ${
                selectedAddress?.address_id === address.address_id
                  ? "bg-rose-200"
                  : "bg-gray-100 opacity-50" // Apply faded style to unselected addresses
              } cursor-pointer`}
              onClick={() => handleAddressSelect(address)}
            >
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">
                    {address.full_address.split(",")[0]}
                  </h3>
                  {selectedAddress?.address_id === address.address_id && (
                    <FaCheckCircle className="text-rose-800 text-xl" />
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

export default ShippingAddressList;

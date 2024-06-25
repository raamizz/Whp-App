import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useUser } from "@/context/UserContext";
import { Address } from "@/type/AddressType";
import FlashAlert from "../Other/FlashAlert";
import { baseUrl, graphqlbaseUrl } from "@/utils/constants";
import Cookies from "js-cookie";
import axios from "axios";
import AddAddressModal from "@/app/checkout/AddAddressModal";
import EditAddressModal from "./EditAddressModal";
import Image from "next/image";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";

const ProfileDetails = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [message, setMessage] = useState<any>("");
  const [type, setType] = useState<any>("");
  const [showAddressModal, setShowAddressModal] = useState<boolean>(false);
  const [id, setId] = useState<any>();
  const [allAddress, setallAddress] = useState<Address[]>();
  const [selectedAddress, setSelectedAddress] = useState<Address>();
  const { logOut, isLoggedIn, userDetails } = useUser();

  useEffect(() => {
    if (window.location.href === "/profile" && isLoggedIn === false) {
      router.replace("/");
    }
  }, [isLoggedIn, router]);

  const handleLogOut = () => {
    if (typeof window !== "undefined") {
      Cookies.remove("localtoken");
      logOut();
      router.push("/");
    }
  };
  const closeModal = () => {
    setShowAddressModal(false);
  };

  const handleRemoveAddress = async (id: any) => {
    setIsLoading(true);
    setallAddress(allAddress?.filter((item) => item.address_id != id));
    try {
      const cookieTokenn = Cookies.get("localtoken");

      const getAuthHeaders: any = () => {
        if (!cookieTokenn) return null;
        return {
          authorization: `Bearer ${cookieTokenn}`,
        };
      };

      const client = new ApolloClient({
        uri: graphqlbaseUrl,
        headers: getAuthHeaders(),
        cache: new InMemoryCache(),
      });
      const DELETE_CUSTOMER_ADDRESS = gql`
        mutation DeleteCustomerAddresses(
          $customerAddresses: [CustomerAddressesInput!]!
        ) {
          DeleteCustomerAddresses(customerAddresses: $customerAddresses) {
            message
          }
        }
      `;

      const { data } = await client.mutate({
        mutation: DELETE_CUSTOMER_ADDRESS,
        variables: {
          customerAddresses: [
            {
              address_id: id,
            },
          ],
        },
        fetchPolicy: "no-cache",
      });
      setMessage(data.DeleteCustomerAddresses.message);
      setType("success");
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
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
      setallAddress(data.getCustomerAddresses);
    };
    fetchData();
  }, []);
  // useEffect(() => {
  //   const fetchAddresses = async () => {
  //     setIsLoading(true);
  // const cookieTokenn = Cookies.get("localtoken");
  //     try {

  //       const response = await axios.get<{ customerAddress?: Address[] }>(
  //         `${baseUrl}/customer/getAddresses`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${cookieTokenn}`,
  //           },
  //         }
  //       );

  //       setallAddress(response.data.customerAddress);
  //     } catch (error) {
  //       console.error("Error fetching addresses:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchAddresses();
  // }, []);
  const handleEditAddress = (addressId: any) => {
    const addressToEdit =
      allAddress &&
      allAddress.find((address) => address.address_id === addressId);

    setSelectedAddress(addressToEdit);
    setShowModal(true);
    console.log("EditAddress", selectedAddress);
  };

  const closeEditModal = () => {
    setShowModal(false);
  };
  if (isLoading) {
    return (
      <div className="loading-container flex justify-center items-center h-full">
        <Image src="/dummy/loader.gif" alt={"loader"} height={50} width={50} />
      </div>
    );
  }
  return (
    <div className="mt-10 m-24">
      <div className="flex justify-between">
        <div>
          <p className="font-bold text-xl">Personal Information</p>
          <p className="text-[#cfcdcd]">Manage your profile</p>
        </div>
        <div className="flex">
          <Icon.SignOut className="mt-1" />
          <p className="cursor-pointer" onClick={() => handleLogOut()}>
            Logout
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <p className="font-bold">
          Wallet Balance:{userDetails?.customer?.wallet_amount}
        </p>
      </div>
      <form>
        <div className="grid gap-7 md:grid-cols-2 items-center justify-center">
          <div>
            <label
              htmlFor="first_name"
              className="block text-md font-medium text-black"
            >
              First name
            </label>
            {userDetails?.firstname}
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block text-md font-medium text-black"
            >
              Last name
            </label>
            {userDetails?.lastname}
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-md font-medium text-black"
            >
              Phone number
            </label>
            {userDetails?.mobile_no}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-md font-medium text-black"
            >
              Email address
            </label>
            {userDetails?.email}
          </div>
        </div>
      </form>
      <div className="flex justify-between px-[15px]">
        <h2 className="text-xl font-semibold mb-3 mt-4">My Addresses</h2>
        <h2
          className="text-xl  text-[#e26178] mb-3 mt-4 cursor-pointer"
          onClick={() => setShowAddressModal(true)}
        >
          Add Address
        </h2>
      </div>
      <div className="flex flex-wrap">
        {allAddress &&
          allAddress.map((address: any) => (
            <div
              key={address.address_id}
              className="flex rounded-lg shadow-md mr-2"
            >
              <div className=" bg-white p-4 mt-6 w-[250px] h-[130px] ">
                <p>
                  {address.full_address}, {address.city}, {address.pincode},{" "}
                  {address.address_type}
                </p>
              </div>
              <div className="flex flex-col">
                <button className="hover:text-[#E26178] flex justify-center">
                  <Icon.PencilSimple
                    size={25}
                    onClick={() => handleEditAddress(address.address_id)}
                  />
                </button>
                <button className="p-2 text-sm text-black hover:text-[#E26178]">
                  <Icon.X
                    size={25}
                    onClick={() => handleRemoveAddress(address.address_id)}
                  />
                </button>
              </div>
              {showModal &&
                selectedAddress?.address_id === address.address_id && (
                  <EditAddressModal
                    closeModal={closeEditModal}
                    singleAddress={selectedAddress}
                  />
                )}
            </div>
          ))}
      </div>
      {showAddressModal && (
        <AddAddressModal
          closeModal={closeModal}
          isForBillingAddress={false}
          onAddressAdded={function (isBillingAddress: boolean): void {
            throw new Error("Function not implemented.");
          }}
        />
      )}
      {message && <FlashAlert message={message} type={type} />}
    </div>
  );
};

export default ProfileDetails;

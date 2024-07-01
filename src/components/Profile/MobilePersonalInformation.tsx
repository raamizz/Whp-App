import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useUser } from "@/context/UserContext";
import { Address } from "@/type/AddressType";
import { baseUrl, graphqlbaseUrl } from "@/utils/constants";
import Cookies from "js-cookie";
import axios from "axios";
import AddAddressMobile from "@/app/checkout/AddAddressMobile";
import EditAddressModal from "./EditAddressModal";
import Image from "next/image";
import FlashAlert from "../Other/FlashAlert";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";

interface Props {
  handleComponent: (args: string) => void;
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
  profilePicture: File | null;
}

const MobilePersonalInformation: React.FC<Props> = ({ handleComponent }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [message, setMessage] = useState<any>("");
  const [type, setType] = useState<any>("");
  const [showAddressModal, setShowAddressModal] = useState<boolean>(false);
  const [id, setId] = useState<any>();
  const [allAddress, setallAddress] = useState<Address[]>();
  const [selectedFile, setSelectedFile] = useState(null);
  const [formError, setFormError] = useState("");
  const { logOut, isLoggedIn, userDetails, addUserDetails } = useUser();
  const [selectedAddress, setSelectedAddress] = useState<Address>();

  const validationSchema = Yup.object().shape({
    // firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    altPhone: Yup.string().required("Alternate phone number is required"),
    gender: Yup.string().required("Gender is required"),
    dobDay: Yup.string().required("Day is required"),
    dobMonth: Yup.string().required("Month is required"),
    dobYear: Yup.string().required("Year is required"),
    profilePicture: Yup.mixed(),
  });

  const dob = userDetails?.customer?.dob; // Assuming dob is "1998-10-18"
  const [dobYear, dobMonth, dobDay] = dob?.split("-") ?? ["", "", ""];

  const handleSubmit = async (values: FormValues, { resetForm }: any) => {
    setIsLoading(true);
    setFormError("");

    const formattedValues: any = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      altPhone: values.altPhone,
      gender: values.gender,
      dob: `${values.dobYear}-${values.dobMonth}-${values.dobDay}`,
      profile_picture: values.profilePicture,
    };

    try {
      await addUserDetails(formattedValues);
      resetForm();
    } catch (error) {
      setFormError(
        "An error occurred while submitting the form. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: userDetails?.firstname,
      lastName: userDetails?.lastname,
      email: userDetails?.email,
      phone: userDetails?.mobile_no,
      altPhone: userDetails?.altPhone,
      gender: userDetails?.gender,
      dobDay,
      dobMonth,
      dobYear,
      profilePicture: null,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  useEffect(() => {
    if (window.location.href === "/profile" && isLoggedIn === false) {
      console.log("this effecct is running");
      router.replace("/");
    }
  }, [isLoggedIn, router]);

  const handleEditAddress = (addressId: any) => {
    const addressToEdit =
      allAddress &&
      allAddress.find((address) => address.address_id === addressId);

    setSelectedAddress(addressToEdit);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowAddressModal(false);
  };
  const handleRemoveAddress = async (id: any) => {
    setIsLoading(true);
    setallAddress(allAddress?.filter((item) => item.address_id != id));
    try {
      const cookieTokenn = localStorage.getItem("localtoken");

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
      setallAddress(data.getCustomerAddresses);
    };
    fetchData();
  }, []);

  const closeEditModal = () => {
    setShowModal(false);
  };
  const handleBackButton = (args: string) => {
    handleComponent(args);
  };
  if (isLoading) {
    return (
      <div className="loading-container flex justify-center items-center h-full">
        <Image src="/dummy/loader.gif" alt={"loader"} height={50} width={50} />
      </div>
    );
  }
  return (
    <div className="">
      <div className="flex">
        <div onClick={() => handleBackButton("")} className="mt-2">
          <Icon.CaretLeft size={25} />
        </div>
        <div>
          <p className="font-bold text-xl">Personal Information</p>
          <p className="text-[#cfcdcd]">Manage your profile</p>
        </div>
      </div>
      <div className="flex justify-between p-4">
        <div className="flex text-white bg-[#E26178] w-[80px] h-[80px] rounded-full text-[30px] items-center justify-center">
          {userDetails?.profile_picture ? (
            <Image
              src={userDetails?.profile_picture}
              className="rounded-full h-full w-full"
              alt="Profile Picture"
              width={90}
              height={100}
            />
          ) : (
            <Icon.UserCircle size={50} />
          )}
        </div>
        <div className="mt-4">
          <p className="font-bold">
            Wallet Balance:{userDetails?.wallet_amount}
          </p>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-7 md:grid-cols-2 items-center p-4">
          <div className="mb-4">
            <div className="relative">
              <input
                id="profilePicture"
                name="profilePicture"
                type="file"
                accept="image/*"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (
                    event.currentTarget.files &&
                    event.currentTarget.files[0]
                  ) {
                    formik.setFieldValue(
                      "profilePicture",
                      event.currentTarget.files[0]
                    );
                  }
                }}
                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                  formik.errors.profilePicture
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
              />
              <label
                htmlFor="profilePicture"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Profile Picture
              </label>
            </div>
            {formik.errors.profilePicture && (
              <div className="text-red-500 mt-1">
                {formik.errors.profilePicture}
              </div>
            )}
          </div>
          <div className="">
            <div className="relative">
              <input
                id="firstName"
                type="text"
                {...formik.getFieldProps("firstName")}
                value={formik.values.firstName}
                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                  formik.errors.firstName ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
              />
              <label
                htmlFor="lastName"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                First Name
              </label>
            </div>
          </div>
          <div className="">
            <div className="relative">
              <input
                id="lastName"
                type="text"
                {...formik.getFieldProps("lastName")}
                value={formik.values.lastName}
                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                  formik.errors.lastName ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
              />
              <label
                htmlFor="lastName"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Last Name
              </label>
            </div>
          </div>
          <div className="">
            <div className="relative">
              <input
                id="email"
                type="text"
                {...formik.getFieldProps("email")}
                value={formik.values.email}
                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Email
              </label>
            </div>
          </div>
          <div className="select-none ">
            <div className="relative">
              <input
                id="phone"
                type="text"
                {...formik.getFieldProps("phone")}
                value={formik.values.phone}
                readOnly
                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                  formik.errors.phone ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
              />
              <label
                htmlFor="phone"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Phone
              </label>
            </div>
          </div>
          <div className="">
            <div className="relative">
              <input
                id="altPhone"
                type="text"
                {...formik.getFieldProps("altPhone")}
                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                  formik.errors.altPhone ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
              />
              <label
                htmlFor="altPhone"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Alternate Phone
              </label>
            </div>
            {formik.errors.altPhone && (
              <div className="text-red-500 mt-1">{formik.errors.altPhone}</div>
            )}
          </div>
          <div className="">
            <div className="relative">
              <select
                id="gender"
                {...formik.getFieldProps("gender")}
                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                  formik.errors.gender ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
              >
                <option value="" label="Select gender" />
                <option value="male" label="Male" />
                <option value="female" label="Female" />
                <option value="other" label="Other" />
              </select>
              <label
                htmlFor="gender"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Gender
              </label>
            </div>
          </div>
          <div className="">
            <div className="relative">
              <input
                id="email"
                type="text"
                {...formik.getFieldProps("email")}
                value={formik.values.email}
                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                  formik.errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Email
              </label>
            </div>
            {formik.errors.email && (
              <div className="text-red-500 mt-1">{formik.errors.email}</div>
            )}
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="mb-4">
              <div className="relative">
                <input
                  id="dobDay"
                  type="text"
                  {...formik.getFieldProps("dobDay")}
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                    formik.errors.dobDay ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
                />
                <label
                  htmlFor="dobDay"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Day
                </label>
              </div>
              {formik.errors.dobDay && (
                <div className="text-red-500 mt-1">{formik.errors.dobDay}</div>
              )}
            </div>
            <div className="mb-4">
              <div className="relative">
                <input
                  id="dobMonth"
                  type="text"
                  {...formik.getFieldProps("dobMonth")}
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                    formik.errors.dobMonth
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
                />
                <label
                  htmlFor="dobMonth"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Month
                </label>
              </div>
            </div>
            <div className="mb-4">
              <div className="relative">
                <input
                  id="dobYear"
                  type="text"
                  {...formik.getFieldProps("dobYear")}
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                    formik.errors.dobYear ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
                />
                <label
                  htmlFor="dobYear"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Year
                </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d]  text-white py-2 px-4 rounded-lg hover:bg-rose-600 transition-colors ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
      <div className="flex justify-between px-[17px]">
        <h2 className="text-xl font-semibold mb-3 mt-4">My Addresses</h2>
        <h2
          className="text-xl  text-[#e26178] mb-3 mt-4 cursor-pointer"
          onClick={() => setShowAddressModal(true)}
        >
          Add Address
        </h2>
      </div>
      <div className="flex flex-wrap p-4">
        {allAddress &&
          allAddress.map((address: any) => (
            <div key={address.address_id} className="relative w-full">
              <div className=" bg-white p-4  mt-3 w-full h-[130px] mr-2 border">
                <p>{address.full_address},</p>
                <p>
                  {address.city}, {address.pincode}
                </p>
                <p>Address Type:{address.address_type}</p>
              </div>
              <button className="absolute -top-2 bg-[#e26178] rounded-full right-0 p-2 text-sm text-white">
                <Icon.PencilSimple
                  size={18}
                  onClick={() => handleEditAddress(address.address_id)}
                />
              </button>
              <button className="absolute top-7 right-0 p-2 text-sm text-black hover:text-red-700">
                <Icon.X
                  size={25}
                  onClick={() => handleRemoveAddress(address.address_id)}
                />
              </button>
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
        <AddAddressMobile
          isOpen={showAddressModal}
          onClose={closeModal}
          isForBillingAddress={false}
          onAddressAdded={function (address: Address): void {
            throw new Error("Function not implemented.");
          }}
        />
      )}
      {message && <FlashAlert message={message} type={type} />}
    </div>
  );
};

export default MobilePersonalInformation;
